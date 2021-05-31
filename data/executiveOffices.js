import ElectoralApplicant from "../models/electoralApplicant";
import students from '../data/students';
import { randomId } from "../constants/MyFunctions";


export const executiveOffices = [
  ['President', 'Presido', '001'],
  ['Vice President', 'VP', '002'],
  ['Secretary General', 'Sec. Gen', 'SG'],
  ['Assistant Secretary General', 'Ast. Sec. Gen', 'ASG'],
  ['Director of Finance', 'Dir. Finance', 'DOF'],
  ['Director of Projects', 'Dir. Projects', 'DOP'],
  ['Director of Socials', 'Dir. Socials', 'DOS'],
  ['Director of Sports', 'Dir. Sports', 'DOSp'],
  ['Director of Public Relations', 'Dir. Pub. Relations', 'PRO'],
  ['Director of Welfare', 'Dir. Welfare', 'DOW'],
  ['Director of Transports', 'Dir. Transports', 'DOT'],
  ['Director of Treasury', 'Dir. Treasury', 'DTS'],
  ['Director of Special Functions', 'Dir. Special Funcs', 'DSF']
];

const dummyManifesto = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus orci, ultrices sit amet scelerisque vitae, tempus eu quam. Sed eu sapien metus. Suspendisse luctus nulla sapien, ut pharetra sem viverra in. Praesent sagittis, sapien et imperdiet commodo, mi diam maximus ex, vitae tristique massa lectus ut felis. Aliquam ut convallis diam. Nunc mollis sapien elit, ut dictum augue scelerisque id. Integer mi enim, ullamcorper sit amet ipsum luctus, pellentesque iaculis massa. Nam nec leo nec diam vehicula mattis a eu massa. Maecenas et nunc nec metus sollicitudin molestie. Cras congue lacinia blandit. Duis a est pretium, imperdiet nulla et, suscipit leo. Sed bibendum sapien et urna consequat, eget facilisis quam accumsan. Duis eget massa vulputate risus posuere scelerisque maximus et ante. Vestibulum sed elit id urna imperdiet rhoncus sed vitae augue. Nullam urna odio, accumsan eu feugiat sed, vulputate eu nisl. Pellentesque id mi nec odio auctor fringilla.'
const dummyExperiences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ',
  'Pellentesque tellus orci, ultrices sit amet scelerisque vitae, tempus eu quam.',
  'Sed eu sapien metus. Suspendisse luctus nulla sapien, ut pharetra sem viverra in.',
];
const studs = students.filter(s => (+(s.level) > 100) && ( s.department=== 'Computer Engineering'));


export const tempRegCandidates = [];

for (let i = 1; i <= 36; i++) {
  const studentData = studs[+(Math.random()*(studs.length - 2)).toFixed(0)]
  tempRegCandidates.push(
    new ElectoralApplicant(
      studentData && randomId({length:10, attach: studentData.fullName+studentData.department+ studentData.faculty}),
      studentData,
      executiveOffices[+(Math.random() * (executiveOffices.length - 2)).toFixed(0)],
      'Excellence is perceived by excellent goal setters.',
      dummyManifesto,
      dummyExperiences
    )
  );
}

