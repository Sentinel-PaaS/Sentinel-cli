# Sentinel
A platform as a service with built in canary deployments

# Initial Setup

1. Create a keypair called "ssh-kp" in "us-east-2" in AWS.
2. Download `ssh-kp.pem`, and move to `~/.ssh/ssh-kp.pem`.
3. Run `chmod 400 ~/.ssh/sse-kp.pem`.
4. From the root of the project directory, run `bash sentinel_init.sh`

# Test Initial Setup

1. From a terminal, `ssh -i "~/.ssh/ssh-kp.pem" ec2-user@ec2-3-129-248-115.us-east-2.compute.amazonaws.com`
2. Get the public of the manager node by running `curl http://169.254.169.254/latest/meta-data/public-ipv4`
3. Visit that IP, unsecured, e.g, `http://3.129.248.115/`
4. 1 out of every 3 times, you should see "THIS IS THE CANARY!!" at the bottom of the page.

# Remove Infrastructure From Test

1. From the root project directory, run `bash sentinel_destroy.sh`.