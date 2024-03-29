+++
title = 'Preparation for the Inaugural “RISC-V Software Porting and Optimization Championship” Officially Launched'
date = 2023-10-28T00:28:09+08:00
toc = true
slug = '00'
summary = 'To date, billions of RISC-V devices has already been deployed in the MCU/IoT realms and is poised to challenge established players in the desktop computing, HPC, AI, and database markets. Compared to the embedded and IoT software ecosystem, the world of desktops and servers boast a vast software ecosystem demands considerable porting and optimization efforts.'
+++

## Event Name

RISC-V Software Porting and Optimization Championship

RISC-V 软件移植及优化锦标赛

Чемпионат по портированию и оптимизации программного обеспечения RISC-V

RISC-V ソフトウェアの移植と最適化チャンピオンシップ

RISC-V 소프트웨어 포팅 및 최적화 챔피언십

## Rationale

To date, billions of RISC-V devices has already been deployed in the MCU/IoT realms and is poised to challenge established players in the desktop computing, HPC, AI, and database markets. Compared to the embedded and IoT software ecosystem, the world of desktops and servers boast a vast software ecosystem demands considerable porting and optimization efforts. 

In the past few years, the PLCT Lab dedicated a great amount of financial and human resources along with research and development groups around the globe in an effort to enhance RISC-V’s software ecosystem. Today, almost all mainstream Linux distributions are already providing or are actively working to support the RISC-V architectures. Toolchains and runtimes such as GNU, Clang/LLVM, OpenJDK, V8 and SpiderMonkey are now working reliably on RISC-V.

The fact that open sources software are not as optimized for RISC-V hardware platforms as their x86 and ARM64 counterpart points to the need for more developer input. To help attract developers to the RISC-V ecosystem and to accelerate the advancement of its software ecosystem, the PLCT Lab launched the “RISC-V Software Porting and Optimization Championship.” This championship sets its focus on desktop and server software ecosystems, designing competitive categories for compilers, runtime environments, AI software stacks, etc. and is open to participation by developers around the globe. 

## Championship Organizers

Host: The PLCT Lab (associated with the Intelligent Software Research Center of the Institute of Software, Chinese Academy of Sciences)

Event Host: Hangzhou Quancheng Intelligent Software Co., Ltd.

Co-host: RISC-V China Community (CNRV)

Note: Organizers are subject to change. Please follow our latest updates on CNRV’s WeChat Official Account. 

## Competitive Categories

The championship will consist of <font color=red>**porting capture-the-flag**</font> and<font color=red> **optimization sprint**</font> events.

The **porting capture-the-flag** event sets a particular software for porting to the RISC-V architecture. In essence, the first team or individual to complete and submit the port wins. The host opens a repository for participant submissions, the first to submit their changes and pass the tests will be made the winner. The code submitted during the event will be copyrighted or attributed to the participating individuals or the open source communities that receive the port. We encourage the participants to contribute their code to the upstream projects.

The **optimization sprint** sets a series of **evaluation criteria**, against which the team or individual’s optimization work will be benchmarked. The teams and individuals will optimize a specified project within a set interval and the best benchmarked project wins.

Based on the number of participants, the championship will run both individual and team events. For individual events, the participant will complete their work individually and wholly receive any prizes awarded. Events with two or more participants will be listed under the team events category. The team events set no limit on the number of participants and the teams will decide on their own terms regarding how to split the prizes awarded. 

## Championship Schedule

October 31, 2023: Deadline for Sponsorship Registration

November 1, 2023 – November 30, 2023: Event Launch an Announcement of Projects

December 1, 2023 – February 16, 2024: Registration and Competitive Events

February 17, 2024 – March 1, 2024: Host Assessment of Submissions and Announcement of Winners

Early April, 2024: Awards Ceremony and RISC-V Technical Seminar 

## Call for Sponsors

This championship is open to manufacturer sponsorship. We welcome donations from RISC-V manufacturers and look forward to collaborations.

### Sponsorship Contributions and Perks

The sponsors may participate in project and prize designs. The sponsors will also be advertised during the events. 
Sponsorships start at CNY 200,000 and cap at CNY 1,000,000 (subject to change). Sponsors may negotiate and customize their contribution based on the number of projects and amount of prizes proposed. 

Sponsorships will be utilized as follows:

- 30% of the amount donated will be used for event organization, as well as costs incurred for staffing, organization, and promotion.

- 70% of the amount donated will be used as prizes.

Sponsor perks are as follows:

- <font style="background:Yellow">Specifying hardware devices or platforms as porting and optimization targets.</font> 

- Designing competitive projects and rights to derive project designs (more detailed rules to follow).

- Designing prize distribution schemes and assessing submissions with the host.

- Attending the awards ceremony and the RISC-V technical seminar, with a 20 minute keynote segment, as well as promotions and hiring, stands, and invitation to the contributors’ dinner.

- Participating in other host promotional activities, including both in-person and live online events. 

Those who are interested in becoming a sponsor, please get in touch with us:

- <font color=Blue>**To: “Wei Wu”** wuwei2016@iscas.ac.cn</font>

- <font color=Blue>**Subject: “[RVPOC] Sponsor + your_company_name”**</font>
    
## Template: Project Design

We are currently calling for competitive project designs. Anyone from the various communities for the RISC-V ecosystem are welcome to contribute project designs. Designs may be in the form of a wish list or a software port or optimization.

Those who are interested in submitting a project design, please submit them here: 

- <font color=Blue>**To:“Wei Wu”** wuwei2016@iscas.ac.cn</font>

- <font color=Blue>**Subject:“[RVPOC] WISHLIST + the software you want to run on rv”**</font>

### Event Class: Porting Capture-the-Flag

Winning participants must open source their submissions and contribute their changes to the upstream project.

| Type  | Project                                 | Reference Prizes(in CNY) | Assessment Platform      | Sponsor    |
| -------- | ----------------------------------- | ------------------- | ----------- | -------- |
| Runtime    | Mono on RISC-V                      |  50,000             | SG2042 QEMU | TBA      |
| Runtime    | RISC-V V-extension port WASM SIMD REVEC in V8 |  100,000             | SG2042 QEMU | TBA      |
| Runtime    | Contributions and ideas welcome!                       |                     |             |           |

### Event Class: Optimization Sprint

Both open-source and closed source tracks will be hosted. Participants must take part in the open-source track to receive prizes. 

| Type | Project       | Reference Prizes(in CNY)| Assessment Platform | Sponsor    |
| ------ | ---------- | -------------------- | -------- | -------- |
| JavaScript Engine | Firefox Kraken benchmark optimization     | 5,000    | LicheePi 4A  SG2042       | TBD         |
| JavaScript Engine | V8 bit-ops optimization using the RISC-V B-extensions | 30,000         | Unmatched SG2042 TH1520         | TBD         |
| Games    | OpenRA optimization on SG2042 platforms (in frames-per-second)     | 100,000         | SG2042 SG2044         | TBD         |
| rvv0p7 | Translation tool or system forrunning RVV<sub>1.0</sub>-optimized applications on RVV<sub>0.7</sub> hardware that offers maximal performance | 200,000         |          | TBD         |
| rvv0p7 | Contributions and ideas welcome!|         |          |         |

## Organization of the Accreditation Committees

The host (the PLCT Lab) will assemble an Accreditation Committee for each competitive project with open rosters, consisting of industry-renowned developers, sponsorship representatives, vendor representatives, as well as volunteers. The Accreditation Committees will reproduce and assess the submitted results.

## Championship Awards Ceremony and RISC-V Technical Seminar

Date: Early April, 2024.
Location: Hangzhou (venue pending, sponsorships welcome).
Format: In-person full-day seminar.
Agenda: To be announced March, 2024.

## Note to Participants (Updates Forthcoming)

1.This championship accepts both individual and team participants, with no limit on the number of registered participants.

2.The competitions will run both open-source and closed source (commercial) tracks. Only participants of the open-source track are eligible for receiving prizes. Those who participate in the closed source (commercial) track will only be recorded in event ranking. 

3.We welcome participants from all countries and regions. Participants from mainland China needs to provide details on their domestic bank cards to receive prizes; 
non-mainland China participants must submit their passport or boarder pass information, as well as their bank account details (banks must be SWIFT or CIPS members). 

4.More detailed notes forthcoming.
