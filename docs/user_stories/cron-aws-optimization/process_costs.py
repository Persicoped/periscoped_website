#!/usr/bin/env python3

import json
import sys
from datetime import datetime
from typing import Dict, List, Tuple

def load_cost_data(file_path: str) -> Dict:
    """Load AWS cost data from JSON file"""
    with open(file_path, 'r') as f:
        return json.load(f)

def categorize_services() -> Dict[str, List[str]]:
    """Define which services are essential vs optional for SAAS platform"""
    return {
        'essential': [
            'Amazon Elastic Compute Cloud - Compute',
            'Amazon Relational Database Service', 
            'Amazon Virtual Private Cloud',
            'Amazon Elastic Load Balancing',
            'Amazon Simple Storage Service',
            'EC2 - Other',
            'Amazon EC2 Container Registry (ECR)',
            'Amazon Elastic Container Service'
        ],
        'optional_high_impact': [
            'AWS Config',
            'AWS Security Hub', 
            'AWS Support (Business)',
            'Amazon QuickSight',
            'Amazon OpenSearch Service'
        ],
        'optional_low_impact': [
            'AWS Amplify',
            'AWS Secrets Manager',
            'Amazon Route 53',
            'CodeBuild',
            'AWS Lambda',
            'Amazon DynamoDB',
            'Amazon Simple Email Service'
        ]
    }

def process_cost_data(data: Dict) -> Tuple[List, float]:
    """Process cost data and return sorted services with total cost"""
    services = []
    total_cost = 0.0
    
    for result in data['ResultsByTime']:
        for group in result['Groups']:
            service_name = group['Keys'][0]
            cost = float(group['Metrics']['BlendedCost']['Amount'])
            
            if cost > 0:  # Only include services with actual costs
                services.append({
                    'name': service_name,
                    'cost': cost
                })
                total_cost += cost
    
    # Sort by cost descending
    services.sort(key=lambda x: x['cost'], reverse=True)
    return services, total_cost

def generate_html_report(services: List[Dict], total_cost: float, month_name: str) -> str:
    """Generate HTML email report"""
    categories = categorize_services()
    
    # Calculate savings from high impact removals
    high_impact_savings = sum(
        service['cost'] for service in services 
        if service['name'] in categories['optional_high_impact']
    )
    
    html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; }}
            .header {{ color: #2c3e50; }}
            .cost-high {{ color: #e74c3c; font-weight: bold; }}
            .cost-medium {{ color: #f39c12; }}
            .cost-low {{ color: #27ae60; }}
            .savings {{ background: #d5f4e6; padding: 10px; border-radius: 5px; margin: 10px 0; }}
            table {{ border-collapse: collapse; width: 100%; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            th {{ background-color: #f2f2f2; }}
            .essential {{ background-color: #e8f5e8; }}
            .optional-high {{ background-color: #ffe8e8; }}
            .optional-low {{ background-color: #fff3cd; }}
        </style>
    </head>
    <body>
        <h1 class="header">🎯 AWS Cost Optimization Report - {month_name}</h1>
        
        <div class="savings">
            <h2>💰 Potential Monthly Savings: ${high_impact_savings:.2f}</h2>
            <p><strong>Annual Savings: ${high_impact_savings * 12:.2f}</strong></p>
        </div>
        
        <h2>📊 Total Monthly Spend: ${total_cost:.2f}</h2>
        
        <h2>🔥 High Impact Removals (Safe to Cut)</h2>
        <table>
            <tr><th>Service</th><th>Monthly Cost</th><th>Annual Cost</th><th>Action</th></tr>
    """
    
    # High impact removals
    for service in services:
        if service['name'] in categories['optional_high_impact']:
            html += f"""
            <tr class="optional-high">
                <td>{service['name']}</td>
                <td class="cost-high">${service['cost']:.2f}</td>
                <td class="cost-high">${service['cost'] * 12:.2f}</td>
                <td>✂️ CUT NOW</td>
            </tr>
            """
    
    html += """
        </table>
        
        <h2>⚡ Essential Services (Keep Running)</h2>
        <table>
            <tr><th>Service</th><th>Monthly Cost</th><th>Status</th></tr>
    """
    
    # Essential services
    for service in services:
        if service['name'] in categories['essential']:
            html += f"""
            <tr class="essential">
                <td>{service['name']}</td>
                <td>${service['cost']:.2f}</td>
                <td>✅ ESSENTIAL</td>
            </tr>
            """
    
    html += """
        </table>
        
        <h2>🔍 Low Impact Optional Services</h2>
        <table>
            <tr><th>Service</th><th>Monthly Cost</th><th>Recommendation</th></tr>
    """
    
    # Low impact optional
    for service in services:
        if service['name'] in categories['optional_low_impact']:
            recommendation = "Consider reviewing" if service['cost'] > 5 else "Monitor"
            html += f"""
            <tr class="optional-low">
                <td>{service['name']}</td>
                <td>${service['cost']:.2f}</td>
                <td>{recommendation}</td>
            </tr>
            """
    
    html += """
        </table>
        
        <p><em>Report generated on {}</em></p>
    </body>
    </html>
    """.format(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    
    return html

def main():
    if len(sys.argv) != 3:
        print("Usage: python3 process_costs.py <input_json> <output_html>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    try:
        # Load and process data
        data = load_cost_data(input_file)
        services, total_cost = process_cost_data(data)
        
        # Get month name
        month_name = datetime.now().strftime("%B %Y")
        
        # Generate report
        html_report = generate_html_report(services, total_cost, month_name)
        
        # Save report
        with open(output_file, 'w') as f:
            f.write(html_report)
        
        print(f"Report generated: {output_file}")
        
    except Exception as e:
        print(f"Error processing costs: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 