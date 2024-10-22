import psutil
import platform
from datetime import datetime

# Function to get size in a nice format
def get_size(bytes, suffix="B"):
    """
    Scale bytes to its proper format
    """
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

# System Details
def system_details():
    print("="*40, "System Details", "="*40)
    print(f"System: {platform.system()}")
    print(f"Release: {platform.release()}")
    print(f"Version: {platform.version()}")
    print(f"Machine: {platform.machine()}")
    print(f"Processor: {platform.processor()}")
    print("="*40, "End", "="*40)

# CPU Details
def cpu_details():
    print("="*40, "CPU Details", "="*40)
    print(f"Physical cores: {psutil.cpu_count(logical=False)}")
    print(f"Total cores: {psutil.cpu_count(logical=True)}")
    cpufreq = psutil.cpu_freq()
    print(f"Max Frequency: {cpufreq.max:.2f}Mhz")
    print(f"Min Frequency: {cpufreq.min:.2f}Mhz")
    print(f"Current Frequency: {cpufreq.current:.2f}Mhz")
    print(f"CPU Usage Per Core:")
    for i, percentage in enumerate(psutil.cpu_percent(percpu=True, interval=1)):
        print(f"Core {i}: {percentage}%")
    print(f"Total CPU Usage: {psutil.cpu_percent()}%")
    print("="*40, "End", "="*40)

# Memory Details
def memory_details():
    print("="*40, "Memory Details", "="*40)
    svmem = psutil.virtual_memory()
    print(f"Total: {get_size(svmem.total)}")
    print(f"Available: {get_size(svmem.available)}")
    print(f"Used: {get_size(svmem.used)}")
    print(f"Percentage: {svmem.percent}%")
    print("="*40, "End", "="*40)


# Network Details
def network_details():
    print("="*40, "Network Details", "="*40)
    net_io = psutil.net_io_counters()
    print(f"Total Bytes Sent: {get_size(net_io.bytes_sent)}")
    print(f"Total BytesRecv: {get_size(net_io.bytes_recv)}")
    print("="*40, "End", "="*40)

if __name__ == "__main__":
    print(f"Current Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    system_details()
    cpu_details()
    memory_details()
    network_details()
