import React from 'react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

const FeatureEvents = () => {
  const events = [
    {
      title: 'Monthly Performance Review',
      desc: 'Evaluate employee performance, KPIs, and progress across departments.',
      time: '11:00 - 12:00',
      date: 'Ari 16, 2025',
      bgClass: 'bg-[#7A73FF]/10',
      textClass: 'text-[#1C1C1E]',
    },
    {
      title: 'Team Attendance Audit',
      desc: 'Review attendance records, late check-ins, and leave summaries.',
      time: '12:00 - 01:00',
      date: 'Ari 17, 2025',
      bgClass: 'bg-[#34C759]/10',
      textClass: 'text-[#1C1C1E]',
    },
    {
      title: 'Payroll Processing Cycle',
      desc: 'Finalize salaries, bonuses, and deductions for all employees.',
      time: '01:00 - 02:00',
      date: 'Ari 18, 2025',
      bgClass: 'bg-[#FF3B30]/10',
      textClass: 'text-[#1C1C1E]',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1C1C1E]">Feature Events</h2>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-[#8E8E93] hover:text-[#1C1C1E]">
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {events.map((ev, index) => (
          <div key={index} className={`p-5 rounded-2xl ${ev.bgClass} flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-pointer`}>
            <h4 className="font-bold text-[15px] text-[#1C1C1E]">{ev.title}</h4>
            <p className="text-xs text-[#1C1C1E]/70 leading-relaxed font-medium">
              {ev.desc}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1C1C1E]/70">
                <Clock size={14} /> {ev.time}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1C1C1E]/70">
                <Calendar size={14} /> {ev.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureEvents;
