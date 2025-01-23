"use client"
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader: React.FC = () => {
  return (
    <div>
      <DotLottieReact
        src="https://lottie.host/7760172d-21ec-4ba4-96d9-dfa4a38a3490/KBWMi8BzGb.lottie"
        loop
        autoplay
        height={600}
        width={500}
      />
    </div>
  )
}

export default Loader