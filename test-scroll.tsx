'use client';

import { ScrollContainer } from '@/components/ScrollContainer';

export default function TestScroll() {
  return (
    <div className="h-[400px] border-2 border-red-500">
      <ScrollContainer className="h-full">
        <div className="h-[800px] bg-gradient-to-b from-blue-500 to-purple-500">
          {/* Tall content to enable scrolling */}
          <div className="p-8 text-white text-center">
            <h1 className="text-4xl font-bold mb-6">Scroll Test</h1>
            <p className="text-lg mb-4">Scroll down to see the rubber band effect at the bottom</p>
            <p className="text-lg mb-4">Scroll up past the top to see the rubber band effect at the top</p>
          </div>
          
          {/* Add some spacer content */}
          <div className="space-y-4">
            {[1,2,3,4,5,6,7,8,9,10].map((i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2">Section {i}</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollContainer>
    </div>
  );
}