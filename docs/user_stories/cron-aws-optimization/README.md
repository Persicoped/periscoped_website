# AWS Cost Optimization Cron Job

Automated monthly AWS cost analysis that identifies services you can safely disable to save money.

## Features

- 📊 Monthly cost breakdown by AWS service
- 🔥 Identifies "High Impact Removals" (expensive services safe to cut)
- ⚡ Categorizes essential vs optional services for SAAS platforms
- 💰 Calculates potential monthly and annual savings
- 📧 Sends HTML email reports automatically
- 📅 Runs on the 2nd of each month via cron

## Quick Install

```bash
cd docs/user_stories/cron-aws-optimization
./install_cron.sh
```

## Manual Setup

### Prerequisites

1. **AWS CLI configured** with valid credentials
2. **Sendmail or Postfix** for email delivery
3. **Python 3** installed

### Installation Steps

1. Make scripts executable:
   ```bash
   chmod +x aws_cost_analyzer.sh process_costs.py install_cron.sh
   ```

2. Configure email address in `aws_cost_analyzer.sh`:
   ```bash
   EMAIL_TO="your-email@domain.com"
   ```

3. Test the script manually:
   ```bash
   ./aws_cost_analyzer.sh
   ```

4. Install cron job:
   ```bash
   ./install_cron.sh
   ```

## Email Setup (macOS)

For email delivery on macOS, install postfix:

```bash
brew install postfix
sudo postfix start
```

## How It Works

1. **Data Collection**: Uses AWS Cost Explorer API to get previous month's spending
2. **Categorization**: Classifies services as Essential, High Impact Optional, or Low Impact Optional
3. **Analysis**: Calculates potential savings from removing optional services
4. **Reporting**: Generates HTML email with actionable recommendations
5. **Delivery**: Sends email on 2nd of each month at 9 AM

## Service Categories

### Essential (Keep Running)
- EC2 Compute & Storage
- RDS Database
- VPC & Load Balancing
- S3 Storage
- Container Services (ECR, ECS)

### High Impact Removals (Safe to Cut)
- AWS Config ($30+/month)
- Security Hub ($25+/month) 
- AWS Support Business ($100/month)
- QuickSight ($95+/month)
- OpenSearch Service ($75+/month)

### Low Impact Optional (Review)
- Route 53, Amplify, Secrets Manager
- Lambda, DynamoDB (if minimal usage)
- CodeBuild, SES

## Customization

Edit `process_costs.py` to modify:
- Service categorization rules
- Cost thresholds for recommendations
- Email template styling
- Savings calculations

## Logs

Check logs at: `/tmp/aws_cost_analyzer.log`

## Cron Schedule

The job runs monthly: `0 9 2 * *` (9 AM on 2nd of each month)

To modify schedule, edit crontab:
```bash
crontab -e
```

## Troubleshooting

- **Email not sending**: Check sendmail/postfix configuration
- **AWS errors**: Verify AWS CLI credentials and permissions
- **No data**: Ensure Cost Explorer API access is enabled
- **Permission denied**: Check script file permissions (`chmod +x`)

## Example Output

The email report includes:
- 💰 Potential monthly/annual savings
- 📊 Total monthly spend breakdown  
- 🔥 High impact services to cut immediately
- ⚡ Essential services to keep running
- 🔍 Low impact services to monitor 