+++
title = 'Optimize OpenCV for RISC-V'
url = '/opencv/Optimize_OpenCV_for_RISC-V.html'
+++

# Optimize OpenCV for RISC-V

Zhang Yin, 2020.11.13

## Project Introduction

OpenCV provides a convenient method to port many optimized kernels at once to a new CPU, as long as that CPU supports SIMD/vector instructions. We use so-called Wide Universal Intrinsics for that. By adding implementation of the wide universal intrinsics for RISC-V we can make OpenCV run pretty efficiently on RISC-V architectures.

![Wide Universal Intrinsics](/WUI.png)

Before the start of this project, Wide Universal Intrinsics has obtained several SIMD/vector supports. They are SSE, AVX, AVX2, AVX512 based on x86
architectures, NEON based on ARM architectures, VSX based on IBM power architectures, and MSA based on MIPS architectures.

The goal of the project Optimize OpenCV for RISC-V is to add an implementation of Wide Universal Intrinsics based on RISC-V vector extension. In this way, OpenCV can get vector acceleration on RISC-V architectures.

RISC-V "V" (vector) extension (RVV) is one of the standard extension modules of RISC-V ISA. It mainly adds vector registers and all kinds of vector instructions to basic RISC-V ISA, so that program code can be optimized and accelerated with vector architecture.

## Implementation

Intrinsics generally refers to the interface of low-level assembly language in high-level programming language. Most SIMD/vector instruction sets have their own native intrinsics, RISC-V vector extension also.

![RISC-V Vector Extension implmentation](/RVV.png)

We use RVV native intrinsics to implement the vector data types and vector operations of Wide Universal Intrinsics. And add RISC-V (RVV) backend to the compilation environment and options. When OpenCV is compiled and run on RISC-V platform, the Wide Universal Intrinsics used by the frontend algorithms can be successfully compiled into RISC-V vector instructions.

## Current Status

At present, we have completed the development of the first version implmentation. The first version has been successfully compiled by official RISC-V gnu toolchain and rvv-llvm that supported by PLCT group and passed all the HAL accuracy tests on QEMU simulator.

## Build and Test

### prerequisites

	apt-get update
	apt-get install gcc g++ git make cmake python python3 gcc-multilib vim autoconf automake autotools-dev curl libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev pkg-config libglib2.0-dev

### Build RISC-V GNU Compiler Toolchain and QEMU simulator
	
	git clone git@github.com:riscv/riscv-gnu-toolchain.git -b rvv-intrinsic
	cd riscv-gnu-toolchain
	git submodule update --init --recursive
	./configure --prefix=/opt/RISCV --with-arch=rv64gcv_zfh --with-abi=lp64d
	make linux -j$(nproc)
	make build-qemu -j$(nproc)

### Build OpenCV for RISC-V

	git clone git@github.com:opencv/opencv.git
	cd opencv
	mkdir build && cd build
	cmake -DCMAKE_TOOLCHAIN_FILE=../platforms/linux/riscv64-gcc.toolchain.cmake ../
	make -j$(nproc)
	
### Accuracy Test

	/opt/RISCV/bin/qemu-riscv64 -cpu rv64,x-v=true opencv/build/bin/opencv_test_core --gtest_filter="hal*"

### Test Result

Test trace log:

	CTEST_FULL_OUTPUT
	OpenCV version: 4.5.0-pre
	OpenCV VCS version: 4.4.0-344-g11d400bf1d-dirty
	Build type: Release
	Compiler: /opt/RISCV/bin/riscv64-unknown-linux-gnu-g++  (ver 10.1.0)
	Parallel framework: pthreads (nthreads=12)
	CPU features: RVV
	OpenCL is disabled
	TEST: Skip tests with tags: 'mem_6gb', 'verylong'
	Note: Google Test filter = hal*
	[==========] Running 23 tests from 3 test cases.
	[----------] Global test environment set-up.
	[----------] 21 tests from hal_intrin128
	[ RUN      ] hal_intrin128.uint8x16_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_uint8()
	[       OK ] hal_intrin128.uint8x16_CPP_EMULATOR (8 ms)
	[ RUN      ] hal_intrin128.int8x16_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_int8()
	[       OK ] hal_intrin128.int8x16_CPP_EMULATOR (7 ms)
	[ RUN      ] hal_intrin128.uint16x8_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_uint16()
	[       OK ] hal_intrin128.uint16x8_CPP_EMULATOR (7 ms)
	[ RUN      ] hal_intrin128.int16x8_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_int16()
	[       OK ] hal_intrin128.int16x8_CPP_EMULATOR (5 ms)
	[ RUN      ] hal_intrin128.int32x4_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_int32()
	[       OK ] hal_intrin128.int32x4_CPP_EMULATOR (5 ms)
	[ RUN      ] hal_intrin128.uint32x4_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_uint32()
	[       OK ] hal_intrin128.uint32x4_CPP_EMULATOR (5 ms)
	[ RUN      ] hal_intrin128.uint64x2_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_uint64()
	[       OK ] hal_intrin128.uint64x2_CPP_EMULATOR (2 ms)
	[ RUN      ] hal_intrin128.int64x2_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_int64()
	[       OK ] hal_intrin128.int64x2_CPP_EMULATOR (2 ms)
	[ RUN      ] hal_intrin128.float32x4_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_float32()
	[       OK ] hal_intrin128.float32x4_CPP_EMULATOR (4 ms)
	[ RUN      ] hal_intrin128.float64x2_CPP_EMULATOR
	SIMD128: void opencv_test::hal::intrin128::opt_EMULATOR_CPP::test_hal_intrin_float64()
	[       OK ] hal_intrin128.float64x2_CPP_EMULATOR (2 ms)
	[ RUN      ] hal_intrin128.uint8x16_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_uint8()
	[       OK ] hal_intrin128.uint8x16_BASELINE (15 ms)
	[ RUN      ] hal_intrin128.int8x16_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_int8()
	[       OK ] hal_intrin128.int8x16_BASELINE (10 ms)
	[ RUN      ] hal_intrin128.uint16x8_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_uint16()
	[       OK ] hal_intrin128.uint16x8_BASELINE (13 ms)
	[ RUN      ] hal_intrin128.int16x8_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_int16()
	[       OK ] hal_intrin128.int16x8_BASELINE (9 ms)
	[ RUN      ] hal_intrin128.int32x4_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_int32()
	[       OK ] hal_intrin128.int32x4_BASELINE (11 ms)
	[ RUN      ] hal_intrin128.uint32x4_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_uint32()
	[       OK ] hal_intrin128.uint32x4_BASELINE (8 ms)
	[ RUN      ] hal_intrin128.uint64x2_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_uint64()
	[       OK ] hal_intrin128.uint64x2_BASELINE (5 ms)
	[ RUN      ] hal_intrin128.int64x2_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_int64()
	[       OK ] hal_intrin128.int64x2_BASELINE (3 ms)
	[ RUN      ] hal_intrin128.float32x4_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_float32()
	[       OK ] hal_intrin128.float32x4_BASELINE (7 ms)
	[ RUN      ] hal_intrin128.float64x2_BASELINE
	SIMD128: void opencv_test::hal::intrin128::cpu_baseline::test_hal_intrin_float64()
	[       OK ] hal_intrin128.float64x2_BASELINE (4 ms)
	[ RUN      ] hal_intrin128.float16x8_FP16
	[     SKIP ] Unsupported hardware: FP16 is not available
	[       OK ] hal_intrin128.float16x8_FP16 (3 ms)
	[----------] 21 tests from hal_intrin128 (139 ms total)
	[----------] 1 test from hal_intrin256
	[ RUN      ] hal_intrin256.float16x16_FP16
	[     SKIP ] Unsupported hardware: FP16 is not available
	[       OK ] hal_intrin256.float16x16_FP16 (0 ms)
	[----------] 1 test from hal_intrin256 (0 ms total)
	[----------] 1 test from hal_intrin512
	[ RUN      ] hal_intrin512.float16x32_FP16
	[     SKIP ] Unsupported hardware: FP16 is not available
	[       OK ] hal_intrin512.float16x32_FP16 (0 ms)
	[----------] 1 test from hal_intrin512 (0 ms total)
	[----------] Global test environment tear-down
	[ SKIPSTAT ] 3 tests skipped
	[ SKIPSTAT ] TAG='skip_other' skip 3 tests
	[==========] 23 tests from 3 test cases ran. (140 ms total)
	[  PASSED  ] 23 tests.

## Future Works

### In-memory Vector Types

framework of Wide Universal Intrinsics is designed based on fixed vector length. This implementation based on RISC-V vector extension is also completed with 128-bits fixed vector length. But RISC-V vector extension itself is scalable. As a result of this conflict, the vector types of the current version Universal Intrinsics stored in memory. This is bound to affect performance.

There are two ways to solve this problem: 

1. A new framework of Wide Universal Intrinsics to fit vector length agnostic architectures.
2. Non-scalable support for RVV from compiler side.

### Performance tests and Optimizations

The current version of the implementation passed the accuracy test. But part of the implementations of Universal Intrinsics may not be the most efficient. The performance test and further optimization will be carried out in the future.

### Need Help!

At present, RISC-V "V" (vector) extension specification is still a draft. The compiler and simulator support of RVV and its native intrinsics is at an early stage. There are also few hardware devices (development boards) supporting RVV.
Hope RISC-V community can further promote the development of many aspects, and this project will also benefit from it.

## References and Related Links

* Pull Request of the Implemantation: [https://github.com/opencv/opencv/pull/18228](https://github.com/opencv/opencv/pull/18228)
* Wide Universal Intrinsic: [https://docs.opencv.org/master/df/d91/group__core__hal__intrin.html](https://docs.opencv.org/master/df/d91/group__core__hal__intrin.html)
* OpenCV official repository: [https://github.com/opencv/opencv](https://github.com/opencv/opencv)
* RISC-V ISA specification: [https://github.com/riscv/riscv-isa-manual](https://github.com/riscv/riscv-isa-manual)
* RISC-V “V” extension specification: [https://github.com/riscv/riscv-v-spec](https://github.com/riscv/riscv-v-spec)
* RVV Intrinsic specification: [https://github.com/riscv/rvv-intrinsic-doc](https://github.com/riscv/rvv-intrinsic-doc)
* RISC-V GNU toolchain: [https://github.com/riscv/riscv-gnu-toolchain](https://github.com/riscv/riscv-gnu-toolchain)
* Rvv-llvm from PLCT Group: [https://github.com/isrc-cas/rvv-llvm](https://github.com/isrc-cas/rvv-llvm)
* In-memory Issue details: [https://github.com/riscv/riscv-gnu-toolchain/issues/701](https://github.com/riscv/riscv-gnu-toolchain/issues/701)