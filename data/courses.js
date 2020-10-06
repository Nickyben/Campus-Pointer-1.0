import Course from '../models/course';
import staff from '../data/staff';

const templateCoordinator = staff.find(s => (s.designation === 'Senior Staff' && s.department === 'Computer Engineering'));

const templateLecturers = staff.filter(s => s.department === 'Computer Engineering' && s.isAcademic === true);
export const content = (level) => {
  const contentArr = [];

  for (let s = 1; s <= 9; s++) {
    contentArr.push(
      new Course(
        Math.random().toString(),
        ['Elements of Artificial Intelligence', 'Introduction to Robotics', 'Control Systems', 'Software Engineering',
          'Java Programming', 'Assembly Language Programming', 'Introduction to MicroProcessors',
          'Digital System Networks', 'Digital Communication', 'Digital Systems Design', 'Telecommunication',
          'Electronic Circuits and Devices'][+(Math.random() * 11).toFixed(0)],
        'CSE' + ((100 * level) + +(10) + +s),
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus orci, ultrices sit amet scelerisque vitae, tempus eu quam. Sed eu sapien metus. Suspendisse luctus nulla sapien, ut pharetra sem viverra in. Praesent sagittis, sapien et imperdiet commodo, mi diam maximus ex, vitae tristique massa lectus ut felis. Aliquam ut convallis diam. Nunc mollis sapien elit, ut dictum augue scelerisque id. Integer mi enim, ullamcorper sit amet ipsum luctus, pellentesque iaculis massa. Nam nec leo nec diam vehicula mattis a eu massa. Maecenas et nunc nec metus sollicitudin molestie. Cras congue lacinia blandit. Duis a est pretium, imperdiet nulla et, suscipit leo. Sed bibendum sapien et urna consequat, eget facilisis quam accumsan. Duis eget massa vulputate risus posuere scelerisque maximus et ante. Vestibulum sed elit id urna imperdiet rhoncus sed vitae augue. Nullam urna odio, accumsan eu feugiat sed, vulputate eu nisl. Pellentesque id mi nec odio auctor fringilla.',
        s % 2 === 0 ? 2 : 3,
        (100 * level),
        'Computer Engineering',
        'First',
        templateLecturers.map((s, i) =>
          templateLecturers[+(Math.random() * (templateLecturers.length - 2)).toFixed(0)]
        ).find(s => (s.designation === 'Senior Staff' || s.designation === 'Junior Staff')),
        templateLecturers.map((s, i) =>
          templateLecturers[+(Math.random() * (templateLecturers.length - 2)).toFixed(0)]
        ).filter((s, i) => i <= 5 && s)
      )
    );
  }

  for (let s = 1; s <= 9; s++) {
    contentArr.push(
      new Course(
        Math.random().toString(),
        ['Elements of Artificial Intelligence', 'Introduction to Robotics', 'Control Systems', 'Software Engineering',
          'Java Programming', 'Assembly Language Programming', 'Introduction to MicroProcessors',
          'Digital System Networks', 'Digital Communication', 'Digital Systems Design', 'Telecommunication',
          'Electronic Circuits and Devices'][+(Math.random() * 11).toFixed(0)],
        'CSE' + ((100 * level) + +(20) + +s),
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus orci, ultrices sit amet scelerisque vitae, tempus eu quam. Sed eu sapien metus. Suspendisse luctus nulla sapien, ut pharetra sem viverra in. Praesent sagittis, sapien et imperdiet commodo, mi diam maximus ex, vitae tristique massa lectus ut felis. Aliquam ut convallis diam. Nunc mollis sapien elit, ut dictum augue scelerisque id. Integer mi enim, ullamcorper sit amet ipsum luctus, pellentesque iaculis massa. Nam nec leo nec diam vehicula mattis a eu massa. Maecenas et nunc nec metus sollicitudin molestie. Cras congue lacinia blandit. Duis a est pretium, imperdiet nulla et, suscipit leo. Sed bibendum sapien et urna consequat, eget facilisis quam accumsan. Duis eget massa vulputate risus posuere scelerisque maximus et ante. Vestibulum sed elit id urna imperdiet rhoncus sed vitae augue. Nullam urna odio, accumsan eu feugiat sed, vulputate eu nisl. Pellentesque id mi nec odio auctor fringilla.',
        s % 4 === 0 ? 2 : 3,
        (100 * level),
        'Computer Engineering',
        'Second',
        templateLecturers.map((s, i) =>
          templateLecturers[+(Math.random() * (templateLecturers.length - 2)).toFixed(0)]
        ).find(s => (s.designation === 'Senior Staff' || s.designation === 'Junior Staff')),
        templateLecturers.map((s, i) =>
          templateLecturers[+(Math.random() * (templateLecturers.length - 2)).toFixed(0)]
        ).filter((s, i) => i <= 5 && s)
      )
    );
  }
  return contentArr;
};

const courses = [];
const deptLevels = ['100', '200', '300', '400', '500'];
for (let i = 1; i <= deptLevels.length; i++) {
  courses.push(
    ...content(i),
  );
}
//console.log('The fourth course is: '+courses[3].courseTitle);
export default courses;