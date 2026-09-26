'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import MockupStage from '../mockups/MockupStage';
import SupplyControlTower from '../mockups/SupplyControlTower';
import FieldOps from '../mockups/FieldOps';
import DocumentIntelligence from '../mockups/DocumentIntelligence';
import LogisticsCopilot from '../mockups/LogisticsCopilot';
import LiquidityMonitor from '../mockups/LiquidityMonitor';
import CreditDesk from '../mockups/CreditDesk';
import ComplianceFlow from '../mockups/ComplianceFlow';
import FraudCopilot from '../mockups/FraudCopilot';
import LineMonitor from '../mockups/LineMonitor';
import FloorInspector from '../mockups/FloorInspector';
import MaintenanceFlow from '../mockups/MaintenanceFlow';
import FloorAssistant from '../mockups/FloorAssistant';
import OmnichannelSales from '../mockups/OmnichannelSales';
import StoreOps from '../mockups/StoreOps';
import RestockFlow from '../mockups/RestockFlow';
import MerchCopilot from '../mockups/MerchCopilot';
import s from './IndustryArchitecture.module.css';

// Every solution is shown as the NeuralBI product it ships, by sector and card (`frame` 'window' or 'devices').
const mockups = {
  'supply-chain': [
    { Mockup: SupplyControlTower, frame: 'window' },
    { Mockup: FieldOps, frame: 'devices' },
    { Mockup: DocumentIntelligence, frame: 'window' },
    { Mockup: LogisticsCopilot, frame: 'window' },
  ],
  fintech: [
    { Mockup: LiquidityMonitor, frame: 'window' },
    { Mockup: CreditDesk, frame: 'devices' },
    { Mockup: ComplianceFlow, frame: 'window' },
    { Mockup: FraudCopilot, frame: 'window' },
  ],
  manufacturing: [
    { Mockup: LineMonitor, frame: 'window' },
    { Mockup: FloorInspector, frame: 'devices' },
    { Mockup: MaintenanceFlow, frame: 'window' },
    { Mockup: FloorAssistant, frame: 'window' },
  ],
  retail: [
    { Mockup: OmnichannelSales, frame: 'window' },
    { Mockup: StoreOps, frame: 'devices' },
    { Mockup: RestockFlow, frame: 'window' },
    { Mockup: MerchCopilot, frame: 'window' },
  ],
};

function IndustryArchitecture({ industry, solution, language }) {
  const root = useRef(null);
  const [running, setRunning] = useState(false);
  const live = running;
  const card = solution ?? 0;
  const mockup = mockups[industry]?.[card];

  useEffect(() => {
    let inView = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setRunning(inView && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(records => { inView = records[records.length - 1].isIntersecting; update(); });
    observer.observe(root.current);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return <div ref={root} className={s.scene} data-running={live} data-sector={industry} data-solution={solution} aria-hidden="true">
    {mockup && <MockupStage id={`${industry}-${card}`} frame={mockup.frame} live={live}><mockup.Mockup live={live} language={language} /></MockupStage>}
  </div>;
}

export default memo(IndustryArchitecture);
