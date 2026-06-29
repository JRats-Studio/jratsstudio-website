// "use client";

// import dynamic from "next/dynamic";

// const ParticleBackground = dynamic(
//   () => import("@/components/effects/ParticleBackground"),
//   {
//     ssr: false,
//     loading: () => null,
//   }
// );

// export const ClientParticleBackground = () => {
//   return <ParticleBackground />;
// };

// export default ClientParticleBackground;
"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/effects/ParticleBackground"),
  { ssr: false }
);

export const ClientParticleBackground = () => {
  return <ParticleBackground />;
};

export default ClientParticleBackground;