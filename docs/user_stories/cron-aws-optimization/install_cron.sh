#!/bin/bash

# Install AWS Cost Optimization Cron Job
# Sets up monthly automated cost analysis

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CRON_SCRIPT="$SCRIPT_DIR/aws_cost_analyzer.sh"

echo "Installing AWS Cost Optimization Cron Job..."

# Make scripts executable
chmod +x "$SCRIPT_DIR/aws_cost_analyzer.sh"
chmod +x "$SCRIPT_DIR/process_costs.py"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "ERROR: AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if sendmail is available
if ! command -v sendmail > /dev/null 2>&1; then
    echo "WARNING: sendmail not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "On macOS, please install postfix:"
        echo "  brew install postfix"
    else
        echo "Please install sendmail or postfix for email functionality"
    fi
fi

# Create cron job entry
CRON_ENTRY="0 9 2 * * $CRON_SCRIPT"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "aws_cost_analyzer.sh"; then
    echo "Cron job already exists. Updating..."
    # Remove existing entry and add new one
    (crontab -l 2>/dev/null | grep -v "aws_cost_analyzer.sh"; echo "$CRON_ENTRY") | crontab -
else
    echo "Adding new cron job..."
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
fi

echo "✅ Cron job installed successfully!"
echo "📅 Will run on the 2nd of each month at 9:00 AM"
echo "📧 Reports will be sent to: terry@periscoped.io"
echo ""
echo "To view installed cron jobs: crontab -l"
echo "To test the script manually: $CRON_SCRIPT"
echo ""
echo "Make sure your email is configured for sendmail/postfix to work properly." 