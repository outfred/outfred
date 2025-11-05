import svgPaths from "./svg-a6k9z8xwa4";

function Icon() {
  return (
    <div className="absolute left-[104.19px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[36px] relative rounded-[3.35544e+07px] shrink-0 w-[140.188px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[140.188px]">
        <Icon />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[12px] not-italic text-[14px] text-nowrap text-white top-[8px] whitespace-pre">Add Product</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[57.594px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[57.6px] left-0 not-italic text-[#111111] text-[48px] text-nowrap top-[2px] whitespace-pre">Merchant Dashboard</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[#717182] text-[16px] top-[-2px] w-[431px]">{`Welcome back! Here's what's happening with your store.`}</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[83.188px] relative shrink-0 w-[525.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[83.188px] items-start relative w-[525.703px]">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[83.188px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="basis-0 bg-white grow h-[29px] min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">Overview</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="basis-0 grow h-[29px] min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">Products</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="basis-0 grow h-[29px] min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">Analytics</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="basis-0 grow h-[29px] min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">Settings</p>
        </div>
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[20px] shrink-0 w-[322.641px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-[322.641px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
        <PrimitiveButton3 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3bfee9c0} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 22V12" id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3.29 7L12 12L20.71 7" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7.5 4.27L16.5 9.42" id="Vector_4" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(0,201,80,0.1)] h-[22px] relative rounded-[14px] shrink-0 w-[50.688px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[50.688px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#00c950] text-[12px] text-nowrap whitespace-pre">+12%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function MerchantDashboard() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-between relative w-[236px]">
        <Container2 />
        <Badge />
      </div>
    </div>
  );
}

function MerchantDashboard1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[236px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 whitespace-pre">Total Products</p>
      </div>
    </div>
  );
}

function MerchantDashboard2() {
  return (
    <div className="h-[36px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[236px]">
        <p className="absolute font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#111111] text-[30px] text-nowrap top-[-1px] whitespace-pre">7</p>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[20px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <MerchantDashboard />
          <MerchantDashboard1 />
          <MerchantDashboard2 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3c563480} id="Vector" stroke="var(--stroke-0, #AD46FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3cccb600} id="Vector_2" stroke="var(--stroke-0, #AD46FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[rgba(173,70,255,0.1)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(0,201,80,0.1)] h-[22px] relative rounded-[14px] shrink-0 w-[53.109px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[53.109px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#00c950] text-[12px] text-nowrap whitespace-pre">+24%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function MerchantDashboard3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-between relative w-[236px]">
        <Container3 />
        <Badge1 />
      </div>
    </div>
  );
}

function MerchantDashboard4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[236px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 whitespace-pre">Total Views</p>
      </div>
    </div>
  );
}

function MerchantDashboard5() {
  return (
    <div className="h-[36px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[236px]">
        <p className="absolute font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#111111] text-[30px] top-[-1px] w-[61px]">7.9K</p>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[20px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <MerchantDashboard3 />
          <MerchantDashboard4 />
          <MerchantDashboard5 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p33c1b680} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pd438b00} id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2fb16300} id="Vector_3" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(0,201,80,0.1)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(0,201,80,0.1)] h-[22px] relative rounded-[14px] shrink-0 w-[50.891px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[50.891px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#00c950] text-[12px] text-nowrap whitespace-pre">+18%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function MerchantDashboard6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-between relative w-[236px]">
        <Container4 />
        <Badge2 />
      </div>
    </div>
  );
}

function MerchantDashboard7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[236px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 whitespace-pre">Total Sales</p>
      </div>
    </div>
  );
}

function MerchantDashboard8() {
  return (
    <div className="h-[36px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[236px]">
        <p className="absolute font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#111111] text-[30px] text-nowrap top-[-1px] whitespace-pre">170</p>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_3] bg-white relative rounded-[20px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <MerchantDashboard6 />
          <MerchantDashboard7 />
          <MerchantDashboard8 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 2V22" id="Vector" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2ba0dca0} id="Vector_2" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[rgba(255,105,0,0.1)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[rgba(0,201,80,0.1)] h-[22px] relative rounded-[14px] shrink-0 w-[53.156px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[53.156px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#00c950] text-[12px] text-nowrap whitespace-pre">+32%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,201,80,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function MerchantDashboard9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-between relative w-[236px]">
        <Container5 />
        <Badge3 />
      </div>
    </div>
  );
}

function MerchantDashboard10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[236px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 whitespace-pre">Revenue</p>
      </div>
    </div>
  );
}

function MerchantDashboard11() {
  return (
    <div className="h-[36px] relative shrink-0 w-[236px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[236px]">
        <p className="absolute font-['Space_Grotesk:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#111111] text-[30px] top-[-1px] w-[70px]">164K</p>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_4] bg-white relative rounded-[20px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <MerchantDashboard9 />
          <MerchantDashboard10 />
          <MerchantDashboard11 />
        </div>
      </div>
    </div>
  );
}

function MerchantDashboard12() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[222px] relative shrink-0 w-full" data-name="MerchantDashboard">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function MerchantDashboard13() {
  return (
    <div className="absolute h-[24px] left-[25px] top-[25px] w-[546px]" data-name="MerchantDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#111111] text-[16px] text-nowrap top-[-1px] whitespace-pre">{`Views & Clicks`}</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[2%_0.92%_14%_11.9%]" data-name="Group">
      <div className="absolute bottom-[-0.24%] left-0 right-0 top-[-0.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476 211">
          <g id="Group">
            <path d="M0 210.5H476" id="Vector" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 158H476" id="Vector_2" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 105.5H476" id="Vector_3" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 53H476" id="Vector_4" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 0.5H476" id="Vector_5" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[2%_0.92%_14%_11.9%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.11%] right-[-0.11%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 477 210">
          <g id="Group">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M79.8333 0V210" id="Vector_2" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M159.167 0V210" id="Vector_3" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M238.5 0V210" id="Vector_4" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M317.833 0V210" id="Vector_5" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M397.167 0V210" id="Vector_6" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M476.5 0V210" id="Vector_7" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[2%_0.92%_14%_11.9%]" data-name="Group">
      <Group />
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[86%_85.81%_6.19%_9.62%]" data-name="Group">
      <div className="absolute inset-[86%_88.09%_11.6%_11.9%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_85.81%_6.19%_9.62%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Mon</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[86%_71.64%_6.19%_24.51%]" data-name="Group">
      <div className="absolute inset-[86%_73.56%_11.6%_26.43%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_71.64%_6.19%_24.51%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Tue</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[86%_56.65%_6.19%_38.58%]" data-name="Group">
      <div className="absolute inset-[86%_59.03%_11.6%_40.97%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_56.65%_6.19%_38.58%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Wed</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[86%_42.49%_6.19%_53.48%]" data-name="Group">
      <div className="absolute inset-[86%_44.51%_11.6%_55.49%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_42.49%_6.19%_53.48%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Thu</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[86%_28.6%_6.19%_68.65%]" data-name="Group">
      <div className="absolute inset-[86%_29.98%_11.6%_70.02%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_28.6%_6.19%_68.65%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Fri</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[86%_13.71%_6.19%_82.81%]" data-name="Group">
      <div className="absolute inset-[86%_15.45%_11.6%_84.55%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_13.71%_6.19%_82.81%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Sat</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[86%_0.66%_6.19%_95.31%]" data-name="Group">
      <div className="absolute inset-[86%_0.92%_11.6%_99.08%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_0.66%_6.19%_95.31%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Sun</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[86%_0.66%_6.19%_9.62%]" data-name="Group">
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[86%_0.66%_6.19%_9.62%]" data-name="Group">
      <div className="absolute inset-[86%_0.92%_14%_11.9%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476 1">
            <path d="M0 0.5H476" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <Group10 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[82.9%_88.09%_11.1%_8.97%]" data-name="Group">
      <div className="absolute inset-[86%_88.09%_14%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[82.9%_89.56%_11.1%_8.97%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">0</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[61.9%_88.09%_32.1%_6.23%]" data-name="Group">
      <div className="absolute inset-[65%_88.09%_35%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[61.9%_89.56%_32.1%_6.23%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">250</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[40.9%_88.09%_53.1%_6.23%]" data-name="Group">
      <div className="absolute inset-[44%_88.09%_56%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[40.9%_89.56%_53.1%_6.23%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">500</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[19.9%_88.09%_74.1%_6.41%]" data-name="Group">
      <div className="absolute inset-[23%_88.09%_77%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.9%_89.56%_74.1%_6.41%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">750</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[1.7%_88.09%_92.3%_5.13%]" data-name="Group">
      <div className="absolute inset-[2%_88.09%_98%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[1.7%_89.56%_92.3%_5.13%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">1000</p>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[1.7%_88.09%_11.1%_5.13%]" data-name="Group">
      <Group12 />
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[1.7%_88.09%_11.1%_5.13%]" data-name="Group">
      <div className="absolute inset-[2%_88.09%_14%_11.9%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 210">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <Group17 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[8.72%_0.92%_14%_11.9%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.03%] right-[-0.07%] top-[-0.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 477 194">
          <g id="Group">
            <path d={svgPaths.pea70d00} fill="var(--fill-0, #B47F8E)" fillOpacity="0.3" id="recharts-area-:r6p:" />
            <path d={svgPaths.p3e201800} id="Vector" stroke="var(--stroke-0, #B47F8E)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[8.72%_0.92%_14%_11.9%]" data-name="Group">
      <Group19 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute inset-[62.48%_0.92%_14%_11.9%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.01%] right-[-0.03%] top-[-0.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 477 60">
          <g id="Group">
            <path d={svgPaths.p2872cb00} fill="var(--fill-0, #411129)" fillOpacity="0.3" id="recharts-area-:r6q:" />
            <path d={svgPaths.p264d1d80} id="Vector" stroke="var(--stroke-0, #411129)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[62.48%_0.92%_14%_11.9%]" data-name="Group">
      <Group21 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute h-[250px] left-0 overflow-clip top-0 w-[546px]" data-name="Icon">
      <Group2 />
      <Group11 />
      <Group18 />
      <Group20 />
      <Group22 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[250px] left-[25px] top-[97px] w-[546px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[20px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <MerchantDashboard13 />
      <Container6 />
    </div>
  );
}

function MerchantDashboard14() {
  return (
    <div className="absolute h-[24px] left-[25px] top-[25px] w-[546px]" data-name="MerchantDashboard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#111111] text-[16px] text-nowrap top-[-1px] whitespace-pre">Sales by Day</p>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute inset-[2%_0.92%_14%_11.9%]" data-name="Group">
      <div className="absolute bottom-[-0.24%] left-0 right-0 top-[-0.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476 211">
          <g id="Group">
            <path d="M0 210.5H476" id="Vector" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 158H476" id="Vector_2" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 105.5H476" id="Vector_3" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 53H476" id="Vector_4" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0 0.5H476" id="Vector_5" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute inset-[2%_0.92%_14%_11.9%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.11%] right-[-0.11%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 477 210">
          <g id="Group">
            <path d="M34.5 0V210" id="Vector" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M102.5 0V210" id="Vector_2" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M170.5 0V210" id="Vector_3" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M238.5 0V210" id="Vector_4" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M306.5 0V210" id="Vector_5" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M374.5 0V210" id="Vector_6" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M442.5 0V210" id="Vector_7" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M0.5 0V210" id="Vector_8" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
            <path d="M476.5 0V210" id="Vector_9" stroke="var(--stroke-0, white)" strokeDasharray="3 3" strokeOpacity="0.1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[2%_0.92%_14%_11.9%]" data-name="Group">
      <Group23 />
      <Group24 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[86%_79.58%_6.19%_15.84%]" data-name="Group">
      <div className="absolute inset-[86%_81.87%_11.6%_18.13%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_79.58%_6.19%_15.84%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Mon</p>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[86%_67.49%_6.19%_28.66%]" data-name="Group">
      <div className="absolute inset-[86%_69.41%_11.6%_30.59%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_67.49%_6.19%_28.66%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Tue</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[86%_54.58%_6.19%_40.66%]" data-name="Group">
      <div className="absolute inset-[86%_56.96%_11.6%_43.04%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_54.58%_6.19%_40.66%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Wed</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[86%_42.49%_6.19%_53.48%]" data-name="Group">
      <div className="absolute inset-[86%_44.51%_11.6%_55.49%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_42.49%_6.19%_53.48%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Thu</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[86%_30.68%_6.19%_66.58%]" data-name="Group">
      <div className="absolute inset-[86%_32.05%_11.6%_67.95%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_30.68%_6.19%_66.58%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Fri</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[86%_17.86%_6.19%_78.66%]" data-name="Group">
      <div className="absolute inset-[86%_19.6%_11.6%_80.4%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_17.86%_6.19%_78.66%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Sat</p>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[86%_5.13%_6.19%_90.84%]" data-name="Group">
      <div className="absolute inset-[86%_7.14%_11.6%_92.86%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_5.13%_6.19%_90.84%] leading-[normal] not-italic text-[#888888] text-[12px] text-center text-nowrap whitespace-pre">Sun</p>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[86%_5.13%_6.19%_15.84%]" data-name="Group">
      <Group26 />
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
      <Group31 />
      <Group32 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[86%_0.92%_6.19%_11.9%]" data-name="Group">
      <div className="absolute inset-[86%_0.92%_14%_11.9%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476 1">
            <path d="M0 0.5H476" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <Group33 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[82.9%_88.09%_11.1%_8.97%]" data-name="Group">
      <div className="absolute inset-[86%_88.09%_14%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[82.9%_89.56%_11.1%_8.97%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">0</p>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[61.9%_88.09%_32.1%_7.69%]" data-name="Group">
      <div className="absolute inset-[65%_88.09%_35%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[61.9%_89.56%_32.1%_7.69%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">25</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[40.9%_88.09%_53.1%_7.69%]" data-name="Group">
      <div className="absolute inset-[44%_88.09%_56%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[40.9%_89.56%_53.1%_7.69%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">50</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[19.9%_88.09%_74.1%_7.69%]" data-name="Group">
      <div className="absolute inset-[23%_88.09%_77%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.9%_89.56%_74.1%_7.69%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">75</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[1.7%_88.09%_92.3%_6.59%]" data-name="Group">
      <div className="absolute inset-[2%_88.09%_98%_10.81%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[1.7%_89.56%_92.3%_6.59%] leading-[normal] not-italic text-[#888888] text-[12px] text-nowrap text-right whitespace-pre">100</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[1.7%_88.09%_11.1%_6.59%]" data-name="Group">
      <Group35 />
      <Group36 />
      <Group37 />
      <Group38 />
      <Group39 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[1.7%_88.09%_11.1%_6.59%]" data-name="Group">
      <div className="absolute inset-[2%_88.09%_14%_11.9%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 210">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, #888888)" />
          </svg>
        </div>
      </div>
      <Group40 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute inset-[56.6%_76.96%_14%_13.15%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 74">
        <g id="Group">
          <path d={svgPaths.p238fa600} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute inset-[50.72%_64.5%_14%_25.6%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 89">
        <g id="Group">
          <path d={svgPaths.p3d61cf80} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute inset-[54.08%_52.05%_14%_38.06%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 80">
        <g id="Group">
          <path d={svgPaths.p3c4779c0} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute inset-[39.8%_39.6%_14%_50.51%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 116">
        <g id="Group">
          <path d={svgPaths.p25b86900} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute inset-[28.88%_27.14%_14%_62.97%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 143">
        <g id="Group">
          <path d={svgPaths.p2f8bee00} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute inset-[17.12%_14.69%_14%_75.42%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 173">
        <g id="Group">
          <path d={svgPaths.p28274700} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute inset-[37.28%_2.23%_14%_87.88%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 122">
        <g id="Group">
          <path d={svgPaths.p54eaa00} fill="var(--fill-0, #B47F8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents inset-[17.12%_2.23%_14%_13.15%]" data-name="Group">
      <Group42 />
      <Group43 />
      <Group44 />
      <Group45 />
      <Group46 />
      <Group47 />
      <Group48 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute contents inset-[17.12%_2.23%_14%_13.15%]" data-name="Group">
      <Group49 />
    </div>
  );
}

function RechartsBarR6R() {
  return (
    <div className="absolute contents inset-[17.12%_2.23%_14%_13.15%]" data-name="recharts-bar-:r6r:">
      <Group50 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute h-[250px] left-0 overflow-clip top-0 w-[546px]" data-name="Icon">
      <Group25 />
      <Group34 />
      <Group41 />
      <RechartsBarR6R />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[250px] left-[25px] top-[97px] w-[546px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[20px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <MerchantDashboard14 />
      <Container7 />
    </div>
  );
}

function MerchantDashboard15() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[372px] relative shrink-0 w-full" data-name="MerchantDashboard">
      <Card4 />
      <Card5 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1216px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] h-full items-start relative w-[1216px]">
        <MerchantDashboard12 />
        <MerchantDashboard15 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[32px] h-[710px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[889.188px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[889.188px] items-start pb-0 pt-[32px] px-[32px] relative w-full">
          <Container1 />
          <PrimitiveDiv />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow h-[870px] min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[870px] items-start pl-[15px] pr-0 py-0 relative w-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#111111] text-[16px] text-nowrap top-[-1px] whitespace-pre">Urban Style</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#717182] text-[12px]">Merchant</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[40px] relative shrink-0 w-[89.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[89.156px]">
        <Heading4 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[21.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start relative w-[21.125px]">
        <p className="font-['Poppins:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">US</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Text />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center pl-[69.844px] pr-0 py-0 relative w-full">
          <Container9 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[89px] items-start left-0 pb-px pt-[24px] px-[24px] top-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container11 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[195px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f091200} id="Vector_3" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39897300} id="Vector_4" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#cfd0d2] h-[36px] left-0 rounded-[14px] top-0 w-[223px]" data-name="Button">
      <Icon7 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[109.16px] not-italic text-[#111111] text-[14px] text-nowrap top-[8px] whitespace-pre">Dashboard</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button1 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[195px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2bb95e00} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 14.6667V8" id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p176da400} id="Vector_3" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5 2.84667L11 6.28" id="Vector_4" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[14px] top-0 w-[223px]" data-name="Button">
      <Icon8 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[122.2px] not-italic text-[#111111] text-[14px] text-nowrap top-[8px] whitespace-pre">Products</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button2 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[195px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[14px] top-0 w-[223px]" data-name="Button">
      <Icon9 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[119.5px] not-italic text-[#111111] text-[14px] text-nowrap top-[8px] whitespace-pre">Analytics</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button3 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[195px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p168ad00} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[14px] top-0 w-[223px]" data-name="Button">
      <Icon10 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[127.14px] not-italic text-[#111111] text-[14px] text-nowrap top-[8px] whitespace-pre">Settings</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button4 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[168px] items-start left-[16px] top-[105px] w-[223px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function MerchantDashboard16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[189px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[189px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-1px] whitespace-pre">Go Premium</p>
      </div>
    </div>
  );
}

function MerchantDashboard17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[189px]" data-name="MerchantDashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[189px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] top-0 w-[169px]">{`Get advanced analytics & more`}</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[32px] relative rounded-[14px] shrink-0 w-[189px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[189px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#411129] text-[14px] text-nowrap whitespace-pre">Upgrade Now</p>
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="h-[198px] relative rounded-[20px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[198px] items-start pl-[17px] pr-px py-[17px] relative w-full">
          <MerchantDashboard16 />
          <MerchantDashboard17 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[231px] items-start left-0 pb-0 pt-[17px] px-[16px] top-[639px] w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Card6 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-white h-[870px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[870px] relative w-[256px]">
        <Container12 />
        <List />
        <Container13 />
      </div>
    </div>
  );
}

function MerchantDashboard18() {
  return (
    <div className="absolute bg-white content-stretch flex h-[870px] items-start left-0 top-0 w-[1551px]" data-name="MerchantDashboard">
      <MainContent />
      <Sidebar />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[24px] left-0 top-[-20000px] w-[19.25px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#111111] text-[16px] text-nowrap top-[-1px] whitespace-pre">25</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[1371.28px] px-[24px] py-0 rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[806px] w-[155.719px]" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">← Back to Menu</p>
    </div>
  );
}

export default function DesignSystemGeneration() {
  return (
    <div className="bg-white relative size-full" data-name="Design System Generation">
      <MerchantDashboard18 />
      <Text1 />
      <Button6 />
    </div>
  );
}
