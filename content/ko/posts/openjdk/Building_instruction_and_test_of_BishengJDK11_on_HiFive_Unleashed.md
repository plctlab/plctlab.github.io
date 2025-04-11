+++
title = 'Building instruction and test of BishengJDK11 on HiFive Unleashed'
url = '/openjdk/Building_instruction_and_test_of_BishengJDK11_on_HiFive_Unleashed.html'
+++


> BishengJDK 11 now brings the template interpreter and backends of C1/C2 compiler to the RISC-V world. We supports RV64G (G used to be represent the IMAFD base and extensions of RISC-V ISA) with BV (bit-manipulation and vector extensions) on the way, and the compressed instructions are out of plan.
>
> This test is to build the JDK on RISCV64 and do some benchmark on HiFive Unleashed.

## **0.   Prerequisites**

This test is based on Ubuntu 18.04.5 LTS

```
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 18.04.5 LTS
Release:	18.04
Codename:	bionic
```

## 1. Build riscv-gnu-toolchain

For the infomation of riscv-gnu-toolchain instruction, the following link can be useful:

https://risc-v-getting-started-guide.readthedocs.io/en/latest/linux-qemu.html

https://github.com/riscv/riscv-gnu-toolchain/blob/master/README.md

### 1.1  Getting the source code of riscv-gnu-toolchain

```
$ git clone https://github.com/riscv/riscv-gnu-toolchain
$ cd riscv-gnu-toolchain
$ git rm qemu
$ git submodule update --init --recursive
```

If the access speed of GitHub is slow, you can use gitee instead

```text
$ git clone https://gitee.com/mirrors/riscv-gnu-toolchain
```

Tips: the QEMU sub repository is not necessary for the compilation of toolchain itself, so it can be deleted temporarily

At present, GCC 9.2.0 is officially used, so we need to switch GCC to 9.2.0 branch

```
$ cd riscv-gcc
$ git checkout riscv-gcc-9.2.0
```

### 1.2  Prerequisites

```
$ sudo apt-get install autoconf automake autotools-dev curl python3 libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gpref libto
```

The following problems may occur. Follow the tips to select 'libexpat1-dev' instead of 'libexpat-dev'

```
Note, selecting 'libexpat1-dev' instead of 'libexpat-dev'
```

In addition, there may be problems:

```
ERROR: glib-2.48 gthread-2.0 is required to compile QEMU
ERROR: pixman >= 0.21.8 not present.
       Please install the pixman devel package.
```

Install the following packages can be useful:

```
$ sudo apt-get install libglib2.0-dev
$ sudo apt install libpixman-1-dev
```

### 1.3 Configure and make

```
$ PREFIX="$HOME/opt/riscv"
$ cd riscv-gnu-toolchain
$ ./configure --prefix="${PREFIX}"
$ make newlib -j $(nproc)
$ make linux -j $(nproc)
$ export PATH="$PATH:$PREFIX/bin"
$ export RISCV="$PREFIX"
```

After that, you can add the first line and the last two lines to `~ /. bashrc` and use `$source ~ /. bashrc` if you want to use it in future works.

## **2. Build QEMU**

### **2.1 Getting the source code of QEMU**

The official recommended test is QEMU v5.1.0 (user mode). If you want to use the system mode, I uses QEMU v5.0.0. The construction method can be referred to：[Fedora (on QEMU)](https://github.com/isrc-cas/PLCT-Toolbox/blob/master/deploy_riscv64fedora_qemu.sh)

```text
$ wget https://download.qemu.org/qemu-5.1.0.tar.xz
$ tar xvJf qemu-5.1.0.tar.xz
```

### **2.2 Configure and **make

```text
$ cd qemu-5.1.0/
$ ./configure --target-list=riscv64-softmmu --prefix=/opt/qemu
$ make -j $(nproc)
$ sudo make install
```

### **2.3 Verify that the installation is correct**

```text
$ /path/to/qemu/bin/qemu-system-riscv64 --version
```

The installation is successful if the following output appears:

```text
QEMU emulator version 5.1.0
Copyright (c) 2003-2020 Fabrice Bellard and the QEMU Project developers
```

## 3. External Libraries

To build the whole JDK riscv port, extra libraries of riscv version are required:

- ALSA
- CUPS
- LIBPNG
- Freetype2
- Fontconfig
- zlib
- libuuid
- libxml2
- libpthread-stubs
- libffi
- X11
  - xproto
  - xtrans
  - xextproto
  - renderproto
  - xcb-proto
  - fixesproto
  - kbproto
  - recordproto
  - inputproto
  - xorgproto
  - libICE
  - libSM
  - libXau
  - libXcb
  - libX11
  - libXt
  - libXfixes
  - libXrender
  - libXext
  - libXi
  - libXtst
  - libXrandr

However, the installation of these libraries is extremely cumbersome, and the source code is not all on GitHub. Here is the official[build guide](https://gitee.com/openeuler/bishengjdk-11/blob/risc-v/DEPENDENCY_BUILD.md) and a [build script](https://github.com/azul-research/jdk-riscv/blob/riscv/dev-riscv/docs/CROSS_COMPILING.md) on GitHub。

At present, we first adopt another method, which uses yum to install the libraries on Fedora for RV64 on QEMU and mount the image on x86 host. It is worth noting that this method has not been officially verified by bishengJDK Team.

I will try to verify and summarize the installation methods of these external library systems on the host(x86).

### 3.1 Install external libraries with Fedora on QEMU 

Install the external libraries needed to build JDK with Fedora on QEMU

```
dnf install libX11-devel libXtst-devel libXt-devel libXrender-devel libXrandr-devel libXi-devel libXext-devel
dnf install cups-devel fontconfig-devel alsa-lib-devel freetype-devel  #freetype might be skipped if already installed
dnf install libdwarf-devel libstdc++-static #optional if the DDR is enabled for compilation on the target system
dnf install wget git autoconf automake  #mostly used in the compilation on the target system
dnf install openssl-devel  #optional if the OpenSSL support is required
```

Power off the Fedora on QEMU as follows

```
poweroff
```

Mount the fedora images and start to cross compile

```
$ sudo  partx -v -a  Fedora-Developer-Rawhide-20191123.n.0-sda.raw
partition: none, disk: Fedora-Developer-Rawhide-20191123.n.0-sda.raw, lower: 0, upper: 0
Trying to use '/dev/loop0' for the loop device
/dev/loop0: partition table type 'gpt' detected
/dev/loop0: partition #1 added
/dev/loop0: partition #2 added
/dev/loop0: partition #3 added
/dev/loop0: partition #4 added

$ sudo fdisk -l /dev/loop0
Disk /dev/loop0: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: AD758DB6-0843-40FD-AF2E-46FE0B9F9A42

Device          Start      End  Sectors  Size Type
/dev/loop0p1    2048  1230847  1228800  600M Linux filesystem
/dev/loop0p2 1230848  1230911       64   32K 
/dev/loop0p3 1232896  1249279    16384    8M 
/dev/loop0p4 1249280 20971486 19722207  9.4G Linux filesystem

$ mkdir fedora_mount

$ sudo mount /dev/loop0p4  fedora_mount

$ ls fedora_mount
bin  boot  dev  etc  home  lib  lib64  lost+found  media
mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

## 4. Getting the source code of BishengJDK11

We can get the source code of BishengJDK11 for RISCV on gitee：

```
$ git clone -b risc-v https://gitee.com/openeuler/bishengjdk-11.git
```

or you can get the source code from repo of isrc-cas, a mirror of BishengJDK11 for RISCV

```
$ git clone -b risc-v https://github.com/isrc-cas/bishengjdk-11-mirror.git
```

## 5. Build JDK

### 5.1 Prerequisites

Serveral standard packages are needed to build JDK

```
$ sudo apt-get install pkg-config build-essential zip unzip screen make autoconf libxext-dev libxrender-dev libxtst-dev libxt-dev libcups2-dev libfreetype6-dev mercurial libasound2-dev cmake automake
```

### 5.2 Boot JDK Requirements

Paradoxically, building the JDK requires a pre-existing JDK. This is called the "boot JDK". The boot JDK does not, however, have to be a JDK built directly from the source code available in the OpenJDK Community. Make sure that there already exists another JDK for your host platform that is usable as boot JDK.

download jdk10 for linux-x64

```
$ wget https://download.java.net/openjdk/jdk10/ri/jdk-10_linux-x64_bin_ri.tar.gz
```

then

```
$ tar -xzvf jdk-10_linux-x64_bin_ri.tar.gz
```

### 5.3 Configure and make

```
$ bash configure \
    --openjdk-target=riscv64-unknown-linux-gnu \
    --disable-warnings-as-errors \
    --with-sysroot=/path/to/fedora_mount \
    --x-includes=/path/to/fedora_mount/usr/include \
    --x-libraries=/path/to/fedora_mount/usr/lib \
    --with-boot-jdk=/path/to/bootjdk/jdk-10
$ make images
```

tips: A GCC patch (will be in GCC 10) exposes a couple of "multiple definition" link errors when building the jdk-11.0.8-ga, refer to https://bugs.openjdk.java.net/browse/JDK-8235903. Add `--with- extra-cflags='-fcommon'` or put the patch from above link.

After finishing the build, we can find `jdk` images under `build/linux-riscv64-normal-server-release/images` then run java in QEMU user mode:

```
$ /path/to/qemu/bin/qemu-riscv64 -L /path/to/fedora_mount /path/to/jdk/riscv64/bin/java -version
```

real examle:

```
$ /home/linux/riscv-dev/qemu-5.1.0/build/riscv-qemu/bin/qemu-riscv64 -L /home/linux/riscv-dev/fedora_mount  /home/linux/riscv-dev/linux-riscv64-normal-server-release/images/jdk/bin/java -version
openjdk version "11.0.8-internal" 2020-07-14
OpenJDK Runtime Environment (build 11.0.8-internal+0-adhoc.linux.bishengjdk-11)
OpenJDK 64-Bit Server VM (build 11.0.8-internal+0-adhoc.linux.bishengjdk-11, mixed mode)
```

## 6. QEMU and HiFive Unleashed benchmark

### 6.1 QEMU

#### 6.1.1 run dacapo-9.12-MR1-bach.jar benchmark in QEMU user mode

Refer to the following commands:

```
/path/to/qemu/bin/qemu-riscv64 -L /path/to/fedora_mount /path/to/jdk/riscv64/bin/java -jar dacapo-9.12-MR1-bach.jar benchmark
```

real examle:

```
/home/linux/riscv-dev/qemu-5.1.0/build/riscv-qemu/bin/qemu-riscv64 -L /home/linux/riscv-dev/fedora_mount  /home/linux/riscv-dev/bishengjdk-11/build/linux-riscv64-normal-server-release/images/jdk/bin/java -jar dacapo-9.12-MR1-bach.jar avrora
```

Result:

| Benchmark    | RISC-V64 |
| ------------ | -------- |
| avrora       | PASS     |
| batik        | FAIL     |
| eclipse      | FAIL     |
| fop          | PASS     |
| h2           | PASS     |
| jython       | PASS     |
| luindex      | PASS     |
| lusearch     | PASS     |
| lusearch-fix | PASS     |
| pmd          | PASS     |
| sunflow      | PASS     |
| tomcat       | FAIL     |
| tradebeans   | PASS     |
| tradesoap    | PASS     |
| xalan        | PASS     |
| pass-rate    | 80%      |

In addition, I used the openjdk8 release version on the Ubuntu x86 host to test dacapo-9.12-mr1- bach.jar and batik and tomcat also failed during the test.

### 6.2 HiFive Unleashed

I copy `bishengjdk-11/build/linux-riscv64-normal-server-release/images/jdk` to HiFive Unleashed but it crashed when run `java -version`

Here is the HiFive info:

```
$ uname -a
Linux freedom-u540 5.8.2 #1 SMP Mon Oct 26 09:38:02 UTC 2020 riscv64 riscv64 riscv64 GNU/Linux
$ cat /proc/version
Linux version 5.8.2 (oe-user@oe-host) (riscv64-oe-linux-gcc (GCC) 10.2.0, GNU ld (GNU Binutils) 2.35.0.20200730) #1 SMP Mon Oct 26 09:38:02 UTC 2020
$ cat /proc/cpuinfo
processor	: 0
hart		: 1
isa		: rv64imafdc
mmu		: sv39
uarch		: sifive,u54-mc

processor	: 1
hart		: 2
isa		: rv64imafdc
mmu		: sv39
uarch		: sifive,u54-mc

processor	: 2
hart		: 3
isa		: rv64imafdc
mmu		: sv39
uarch		: sifive,u54-mc

processor	: 3
hart		: 4
isa		: rv64imafdc
mmu		: sv39
uarch		: sifive,u54-mc
```

run `./java -version`：

```
$ ./java -version
#
# A fatal error has been detected by the Java Runtime Environment:
#
#  SIGSEGV (0xb) at pc=0x0000003ff248a876, pid=6138, tid=6144
#
# JRE version: OpenJDK Runtime Environment (11.0.8) (build 11.0.8-internal+0-adhoc.linux.bishengjdk-11)
# Java VM: OpenJDK 64-Bit Server VM (11.0.8-internal+0-adhoc.linux.bishengjdk-11, mixed mode, tiered, compressed oops, g1 gc, linux-riscv64)
# Problematic frame:
# V  [libjvm.so+0x3a5876]  ConstantPool::impl_name_ref_at(int, bool)+0x18
#
# No core dump will be written. Core dumps have been disabled. To enable core dumping, try "ulimit -c unlimited" before starting Java again
#
# An error report file with more information is saved as:
# /home/jdk-riscv/bishengJDK-build-jdk/jdk/bin/hs_err_pid6138.log
#
# If you would like to submit a bug report, please visit:
#   https://bugreport.java.com/bugreport/crash.jsp
#
Aborted
```

Here is the detail of `hs_err_pid6138.log`: https://github.com/isrc-cas/bishengjdk-11-mirror/issues/1#issue-745289455

What I will do next:

1. Install Fedora images on Hifive Unleashed and continue do the benchmark.
2. Try to do benchmark of specjvm2008 and specjbb2015 on Bisheng JDK11 for RV64
3. Compile a slowdebug version, compile [hsdis.so](https://gitee.com/openeuler/bishengjdk-11/blob/risc-v/BUILDING.md#utils) and put it with the same directory of libjvm.so to get more detailed debugging information.



Reference link:

* https://gitee.com/openeuler/bishengjdk-11/blob/risc-v/BUILDING.md
* https://github.com/eclipse/openj9/blob/master/doc/build-instructions/Build_Instructions_V11.md#riscv64