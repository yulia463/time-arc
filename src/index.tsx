import React from 'react';
import {createRoot} from 'react-dom/client';
import TimelineBlock from '@/components/TimelineBlock';
import {demoTimeline} from '@/data/timelineData';
import '@/styles/global.scss';

const App = () => {
    return (
        <div className="demo-grid">
            <TimelineBlock data={demoTimeline} title="Исторические даты" initialIndex={5} instanceId="tb1"/>
            {/*<TimelineBlock data={demoTimeline} title="Исторические даты (второй блок)" initialIndex={1} instanceId="tb2" />*/}
        </div>
    );
};

const container = document.getElementById('root')!;
createRoot(container).render(<App/>);
