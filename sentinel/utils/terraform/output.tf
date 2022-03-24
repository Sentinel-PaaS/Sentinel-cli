### output.tf
# output "manager_public_ip" {
#   value = ["${aws_instance.manager1.public_ip}"]
# }
# output "worker1_public_ip" {
#   value = ["${aws_instance.worker1.public_ip}"]
# }
# output "manager_private_ip" {
#   value = ["${aws_instance.manager1.private_ip}"]
# }
# output "worker1_private_ip" {
#   value = ["${aws_instance.worker1.private_ip}"]
# }

resource "local_file" "hosts" {
  content  = <<-DOC
    [sentinel]
    ${aws_instance.sentinel.public_ip} ansible_user=ec2-user ansible_private_key_file=~/.ssh/ssh-kp.pem
    DOC
  filename = "../ansible/inventory/hosts"
}

resource "local_file" "sentinel-ip" {
  content  = <<-DOC
  ${aws_instance.sentinel.public_ip}
  DOC
  filename = "../sentinel-ip.txt"
}

# Replace this block into the hosts resource. Moved out for testing the sentinel instance exclusivly
# [managers]
# ${aws_instance.manager1.public_ip} ansible_user=ec2-user ansible_private_key_file=~/.ssh/ssh-kp.pem
# [managers:vars]
# manager_private_ip=${aws_instance.manager1.private_ip}
# [workers]
# ${aws_instance.worker1.public_ip} ansible_user=ec2-user ansible_private_key_file=~/.ssh/ssh-kp.pem
