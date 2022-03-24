### main.tf
# Specify the provider and access details
provider "aws" {
  # Use shared configuration and credential files to specify AWS keys
  region = var.aws_region
}
resource "aws_iam_policy" "ec2_policy" {
  name        = "ec2_policy"
  description = "Policy to provide permissions to EC2"
  policy      = file("./ec2_policy.json")
}
resource "aws_iam_role" "ec2_role" {
  name = "ec2_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}
resource "aws_iam_policy_attachment" "ec2_policy_role" {
  name       = "ec2_attachment"
  roles      = [aws_iam_role.ec2_role.name]
  policy_arn = aws_iam_policy.ec2_policy.arn
}
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2_profile"
  role = aws_iam_role.ec2_role.name
}
resource "aws_instance" "sentinel" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = ["${aws_security_group.allow_http.id}", "${aws_security_group.ssh.id}", "${aws_security_group.traefik_dashboard.id}"]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  tags = {
    Name = "Sentinel"
  }
  user_data = <<EOF
#!/bin/bash
# install ansible
sudo amazon-linux-extras enable ansible2
sudo yum install -y ansible

# install terraform
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo yum -y install terraform

# install git
yum install git -y

echo "AWS_EC2_METADATA_SERVICE_ENDPOINT=http://169.254.169.254" >> /home/ec2-user/.bashrc

# DON'T FORGET TO CLONE THE API REPO
EOF
}
# resource "aws_instance" "manager1" {
#   ami                    = var.ami
#   instance_type          = var.instance_type
#   key_name               = var.key_name
#   vpc_security_group_ids = ["${aws_security_group.sgswarm.id}", "${aws_security_group.allow_http.id}", "${aws_security_group.ssh.id}", "${aws_security_group.traefik_dashboard.id}"]
#   tags = {
#     Name = "tf manager 1"
#   }
# }
# resource "aws_instance" "worker1" {
#   ami                    = var.ami
#   instance_type          = var.instance_type
#   key_name               = var.key_name
#   vpc_security_group_ids = ["${aws_security_group.sgswarm.id}", "${aws_security_group.ssh.id}"]
#   tags = {
#     Name = "tf worker 1"
#   }
# }
