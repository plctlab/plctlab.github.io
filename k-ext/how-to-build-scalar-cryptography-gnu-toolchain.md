## How to build scalar cryptography GNU toolchain

Firstly you should prepare the envirmental for build, you can build it on Ubuntu 18.04 LTS or Ubuntu 20.04 LTS

```
$ lsb_release -a
LSB Version:    core-11.1.0ubuntu2-noarch:security-11.1.0ubuntu2-noarch
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.2 LTS
Release:        20.04
Codename:       focal
```

Additionally, you should install some essential tools for build

```
apt-get install git gawk texinfo bison flex python expect ninja-build pkg-config libglib2.0-dev
```

Then clone the riscv-gnu-toolchain repository

```
git clone https://github.com/riscv/riscv-gnu-toolchain 
cd riscv-gnu-toolchain
git submodule update --init
```

Add remote with k-ext and checkout your branch with gcc and binutils

```
cd riscv-gcc
git remote add k https://github.com/WuSiYu/riscv-gcc
git fetch k
git checkout k/riscv-gcc-10.2.0-crypto
cd ../riscv-binutils
git remote add k https://github.com/pz9115/riscv-binutils-gdb.git
git fetch k
git checkout k/riscv-binutils-2.36-k-ext
cd ..
```

Set configure for k-ext, you can build in rv32 or rv64 with different subsets of k-ext, please check the spec RISC-V Cryptographic Extension Proposals chapter 2 "Implementation Profiles" for further use, here is some examples

test total k-ext with zkn, zkr, zks with rv64

```
./configure --prefix="/opt/riscv/rv64gck_zks" --with-arch=rv64gck_zks --with-abi=lp64d --with-multilib-generator="rv64gck_zks-lp64d--"
```

you can use make -j* to make speed up

```
make report-gcc -j $(nproc)
make report-binutils -j $(nproc)
```

you can check the test log, the testcases of k-ext we defined in 

```
vi build-gcc-newlib-stage2/gcc/testsuite/gcc/gcc.log
vi build-binutils-newlib/gas/testsuite/gas.log
find riscv-gcc/gcc/testsuite/gcc.target/riscv/ -name Zk*
find riscv-binutils/gas/testsuite/gas/ -name k-ext*
```

test in rv32:

```
./configure --prefix="/opt/riscv/rv32gck_zks" --with-arch=rv32gck_zks --with-abi=ilp32d --with-multilib-generator="rv64gck_zks-ilp32d--"
make clean 
make report-gcc -j $(nproc)
make report-binutils-newlib -j $(nproc)
```