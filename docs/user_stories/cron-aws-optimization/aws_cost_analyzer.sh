#!/bin/bash

# AWS Cost Optimization Analyzer
# Runs monthly to analyze AWS costs and recommend service removals
# Author: Terry MacGregor
# Date: June 1, 2025

set -e

# Configuration
EMAIL_TO="terry@periscoped.io,all@periscoped.io,itcrowd@periscoped.io"
LOG_FILE="/tmp/aws_cost_analyzer.log"
TEMP_DIR="/tmp/aws_cost_analysis"
ACCOUNT_ID="865776282981"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log "Starting AWS Cost Analysis..."

# Get previous month's date range (macOS compatible)
LAST_MONTH_START=$(date -v-1m -v1d +%Y-%m-01)
LAST_MONTH_END=$(date -v1d +%Y-%m-01)

log "Analyzing costs from $LAST_MONTH_START to $LAST_MONTH_END"

# Get cost data
AWS_PAGER="" aws ce get-cost-and-usage \
    --time-period Start="$LAST_MONTH_START",End="$LAST_MONTH_END" \
    --granularity MONTHLY \
    --metrics BlendedCost \
    --group-by Type=DIMENSION,Key=SERVICE \
    --output json > "$TEMP_DIR/cost_data.json"

# Process the data with Python script
python3 "$(dirname "$0")/process_costs.py" "$TEMP_DIR/cost_data.json" "$TEMP_DIR/report.html"

# Send email via existing Gmail API service
if [ -f "$TEMP_DIR/report.html" ]; then
    log "Sending email report to $EMAIL_TO via Gmail API"
    
    SUBJECT="SequenceStack AWS Optimizer $(date -j -f "%Y-%m-%d" "$LAST_MONTH_START" +"%B %Y")"
    
    # Use existing Node.js Gmail service (run from project root to access .env.local)
    cd "$(dirname "$0")/../../../"
    if node docs/user_stories/cron-aws-optimization/send_aws_report.js "$EMAIL_TO" "$SUBJECT" "$TEMP_DIR/report.html"; then
        log "Email sent successfully via Gmail API"
    else
        log "ERROR: Failed to send email via Gmail API"
    fi
else
    log "ERROR: Report file not generated"
fi

# Cleanup
rm -rf "$TEMP_DIR"

log "AWS Cost Analysis completed" 