#!/bin/bash
FILE=/home/$USER/.sentinel

if [ ! -d "$FILE" ]; then
    echo Creating config files
    #Create directory structure
    mkdir -p /home/$USER/.sentinel/config/terraform/
    mkdir /home/$USER/.sentinel/config/ansible/

    # Download terraform files
    wget -P /home/$USER/.sentinel/config/terraform https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/terraform/ec2_policy.json
    wget -P /home/$USER/.sentinel/config/terraform https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/terraform/main.tf
    wget -P /home/$USER/.sentinel/config/terraform https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/terraform/output.tf
    wget -P /home/$USER/.sentinel/config/terraform https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/terraform/security-groups.tf
    wget -P /home/$USER/.sentinel/config/terraform https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/terraform/variable.tf

    # Download ansible files
    wget -P /home/$USER/.sentinel/config/ansible https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/ansible/ansible.cfg  
    wget -P /home/$USER/.sentinel/config/ansible https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/ansible/playbook.yml
fi

