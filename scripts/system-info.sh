#!/bin/bash
echo "=== system information ===="
echo "Hostname: $(hostname)"
echo "user: $(whoami)"
echo "date:$(date)"
echo "uptime: $(uptime -p)"
echo ""
echo "=== resource usage ==="
echo "cpu:"
top -bn1 | grep "Cpu(s)"

echo " Ram:"
free -h

echo "disk:"
df -h /
ERRORS=0
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$DISK_USAGE" -ge 100 ]; then
	echo "Warning"
	ERRORS=1
else
	echo " ok "
fi
echo ""
echo "====services====="
if systemctl is-active --quiet ssh; then
	echo "ssh:running"
else
	echo "ssh:down"
	ERRORS=1
fi
if systemctl is-active --quiet nginx ; then
	echo "nginx:running"
else
	echo "nginx:down"
	ERRORS=1
fi
echo ""
echo "==== Listenning ports====="
ss -tuln |grep LISTEN

echo""
if [ "$ERRORS" -eq 0 ]; then
	echo "=======healthcheck : ok ========="
	exit 0
else
	echo "========== health check : failed ========="
	exit 1
fi

