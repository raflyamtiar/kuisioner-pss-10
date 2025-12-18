import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa marah/kesal karena sesuatu yang terjadi secara tidak terduga?',
    isReverse: false,
  },
  {
    id: 2,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa tidak mampu mengendalikan hal-hal penting dalam hidup Anda?',
    isReverse: false,
  },
  {
    id: 3,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa gugup dan stres?',
    isReverse: false,
  },
  {
    id: 4,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa yakin dengan kemampuan Anda untuk menangani masalah pribadi?',
    isReverse: true,
  },
  {
    id: 5,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa bahwa segala sesuatu berjalan sesuai keinginan Anda?',
    isReverse: true,
  },
  {
    id: 6,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa tidak bisa mengatasi semua hal yang harus Anda kerjakan?',
    isReverse: false,
  },
  {
    id: 7,
    text: 'Dalam sebulan terakhir, seberapa sering Anda mampu mengendalikan gangguan/iritasi dalam hidup Anda?',
    isReverse: true,
  },
  {
    id: 8,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa menguasai keadaan (on top of things)?',
    isReverse: true,
  },
  {
    id: 9,
    text: 'Dalam sebulan terakhir, seberapa sering Anda marah karena hal-hal yang terjadi di luar kendali Anda?',
    isReverse: false,
  },
  {
    id: 10,
    text: 'Dalam sebulan terakhir, seberapa sering Anda merasa kesulitan menumpuk begitu tinggi sehingga Anda tidak bisa mengatasinya?',
    isReverse: false,
  },
];

export const scaleLabels = [
  'Tidak Pernah',
  'Hampir Tidak Pernah',
  'Kadang-kadang',
  'Cukup Sering',
  'Sangat Sering',
];
