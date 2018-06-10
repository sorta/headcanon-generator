import React from 'react';

const Logo = props => {
  const cName = props.className || 'logo-svg';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 742.292 787.977" className={cName}>
      <title>Generate Headcanon</title>
      <path d="M452.504 769.264c-23.81-18.097-.084-6.968-51.428-45.715-2.256-61.813.144-182.866-42.857-197.143-80-45.431-201.753-7.079-257.143-80C34.31 389.412 22.999 313.11 18.219 212.121 30.932 142.172 60.644 87.525 135.362 34.978c75.382-36.482 254.341-5.754 345.714 20 60.372 30.826 103.134 47.16 177.143 125.714 57.136 58.777 60.433 125.244 65.714 191.429 2.284 94.717-22.864 140.793-71.429 188.571-27.338 18.236-54.373 28.051-111.428 31.429l-85.714-11.429z" fill="#180029" fillRule="evenodd" stroke="#180029" strokeWidth="10" className="logo-dark-stroke logo-dark-fill" />
      <g transform="translate(1.076 -263.099)">
        <path d="M141.714 368.076l402.857 171.43c58.143 30.01 82.764 70.928 71.429 102.856-12.746 47.612-50.234 73.232-131.429 60L93.143 465.22c4.25-68.2 30.599-70.108 48.571-97.143z" fill="#fafafa" fillRule="evenodd" stroke="#180029" className="logo-lite-fill logo-dark-stroke" />
        <circle cx="401.714" cy="659.505" r="74.286" fill="#180029" className="logo-dark-fill" />
        <circle cx="402.857" cy="660.362" r="62.857" fill="#fafafa" className="logo-lite-fill" />
      </g>
    </svg>
  );
};

export default Logo;
