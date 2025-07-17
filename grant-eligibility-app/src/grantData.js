const grantQuestions = {
  housing: [
    { key: 'nonprofit', question: 'Are you a registered nonprofit? (yes/no)' },
    { key: 'location', question: 'What is your organization’s location (state)?' },
    { key: 'project', question: 'Briefly describe your housing project.' },
  ],
  agriculture: [
    { key: 'farmland', question: 'Do you own or lease farmland? (yes/no)' },
    { key: 'purpose', question: 'What is the purpose of your land project?' },
    { key: 'state', question: 'Which state is your project in?' },
  ],
  church: [
    { key: 'faith', question: 'Is your organization faith-based? (yes/no)' },
    { key: 'denomination', question: 'What is your denomination or tradition?' },
    { key: 'project', question: 'Describe your support or outreach project.' },
  ],
  transport: [
    { key: 'llc', question: 'Is your business an LLC? (yes/no)' },
    { key: 'service', question: 'Do you provide transportation for Medi-Cal recipients? (yes/no)' },
    { key: 'county', question: 'Which California county do you serve?' },
  ],
};

const GRANTS = {
  housing: [
    {
      name: 'HUD Continuum of Care (CoC) Program',
      description: 'Federal funding for nonprofits providing transitional and rapid rehousing.',
      link: 'https://www.hud.gov/program_offices/comm_planning/coc',
      eligibility: (a) => a.nonprofit?.toLowerCase() === 'yes' && a.location?.toLowerCase() === 'ca',
    },
    {
      name: 'CA HCD Homeless Programs',
      description: 'State grants for homeless housing in California.',
      link: 'https://www.hcd.ca.gov/grants-and-funding',
      eligibility: (a) => a.nonprofit?.toLowerCase() === 'yes' && a.location?.toLowerCase() === 'ca',
    },
  ],
  agriculture: [
    {
      name: 'USDA Rural Development Grants',
      description: 'Federal grants for land acquisition and development.',
      link: 'https://www.rd.usda.gov/ca',
      eligibility: (a) => a.farmland?.toLowerCase() === 'yes',
    },
    {
      name: 'California Farmland Conservancy Program',
      description: 'State grants for agricultural land conservation.',
      link: 'https://conservation.ca.gov/dlrp/cfcp',
      eligibility: (a) => a.farmland?.toLowerCase() === 'yes' && a.state?.toLowerCase() === 'ca',
    },
  ],
  church: [
    {
      name: 'Lilly Endowment Religion Grants',
      description: 'Grants for faith-based organizations and congregations.',
      link: 'https://lillyendowment.org/for-grantseekers/religion/',
      eligibility: (a) => a.faith?.toLowerCase() === 'yes',
    },
    {
      name: 'Mustard Seed Foundation Grants',
      description: 'Small grants for faith-based outreach projects.',
      link: 'https://msfdn.org/grants/',
      eligibility: (a) => a.faith?.toLowerCase() === 'yes',
    },
  ],
  transport: [
    {
      name: 'Medi-Cal NEMT Provider Program',
      description: 'Become a Medi-Cal transportation provider in California.',
      link: 'https://www.dhcs.ca.gov/services/medi-cal/Pages/Transportation.aspx',
      eligibility: (a) => a.llc?.toLowerCase() === 'yes' && a.service?.toLowerCase() === 'yes' && a.county,
    },
    {
      name: 'Caltrans Transportation Grants',
      description: 'State grants for mobility and transportation services.',
      link: 'https://dot.ca.gov/programs/transportation-planning/regional-planning/transportation-planning-grants',
      eligibility: (a) => a.llc?.toLowerCase() === 'yes' && a.service?.toLowerCase() === 'yes',
    },
  ],
};

export function evaluateEligibility(grantType, answers) {
  const grants = (GRANTS[grantType] || []).filter((g) => g.eligibility(answers));
  if (grants.length > 0) {
    return { eligible: true, grants };
  } else {
    // Find what is missing (simple logic)
    let message = 'You do not currently meet the main eligibility requirements.';
    if (grantType === 'housing' && answers.nonprofit?.toLowerCase() !== 'yes') {
      message = 'You must be a registered nonprofit in California to qualify for most housing grants.';
    }
    if (grantType === 'agriculture' && answers.farmland?.toLowerCase() !== 'yes') {
      message = 'You must own or lease farmland to qualify for most agricultural grants.';
    }
    if (grantType === 'church' && answers.faith?.toLowerCase() !== 'yes') {
      message = 'You must be a faith-based organization to qualify for most church support grants.';
    }
    if (grantType === 'transport' && (answers.llc?.toLowerCase() !== 'yes' || answers.service?.toLowerCase() !== 'yes')) {
      message = 'You must be an LLC and provide transportation for Medi-Cal recipients in California.';
    }
    return { eligible: false, message };
  }
}

export default grantQuestions;