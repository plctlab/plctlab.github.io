# Open Wishlist for RISC-V 2021

Hi all,

The PLCT Lab is inviting everyone inside the RISC-V community to write to us
the dev-tools or other softwares you wish to have in the RISC-V ecosystem.
Feel free to open an issue on plctlab.org[0] and describe the tools you want.

A few simple rules should be met:
- Only open source projects are considered.
- Softwares that have not been ported to RV64G are prefered.
- Language VMs, Compilers, and Performance Analyzing tools are prefered.

There are some items already on the wishlist:
1. Enable Firefox/Spidermonkey running on RV64GCV platform[8].
2. Speed up more than 100x compared with OpenJDK/zero for Java applications[7].
3. Ensure the speed of JS/WASM on RV64GCV is on par with AArch64.
4. Enable DynamoRIO running on RV64GC.

Feel free to contact us and add more items on the wishlist.

This is the second time that the PLCT lab invites all friends in the RISC-V
community to write in what softwares or tools you wish to have for the RISC-V
ecosystem. The first year was mainly targeting the RISC-V China community.
We collected a few wishes at the end of 2019[1], and put (some of) them
into the PLCT Lab's Roadmap 2020[2]. Most of them have been achieved, includes:

- V8 for RISC-V project: Ready to upstream. Collaborating with FutureWei [3].
- Vector Extension Support in LLVM (RVV-LLVM): Implemented v0.7.1, v0.8, v0.9
  and v1.0-draft versions. Used as a codebase by a few AI Chip startups [4].
- OpenCV for RISC-V: Basic Vector Extension support is done. Upstreaming.
  More features are co-developing with the RVV-LLVM project [5].
- QEMU Supports: Implemented SoC emulation for one RISC-V startup. Open Sourced [6].


[0] https://github.com/plctlab/plctlab.github.io/issues

[1] (Zh_CN) https://github.com/isrc-cas/PLCT-Weekly/blob/master/RISCV-DevTools-Wishlist-2020.md

[2] (Zh_CN) https://github.com/isrc-cas/PLCT-Weekly/blob/master/RISCV-Roadmap-2020.md

[3] https://github.com/v8-riscv/v8/

[4] https://github.com/isrc-cas/rvv-llvm

[5] https://plctlab.github.io/opencv/Optimize_OpenCV_for_RISC-V.html

[6] https://github.com/isrc-cas/plct-qemu

[7] BishengJDK has already speed up 20x: https://plctlab.github.io/openjdk/Building_instruction_and_test_of_BishengJDK11_on_HiFive_Unleashed.html

[8] Chromium is being ported by some groups, e.g. the RIOS Lab. So we do not to take care of it.
