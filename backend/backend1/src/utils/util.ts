import { NFTService } from '../services/nft.service';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */

export const isEmpty = (value: string | number | object): boolean => {
  if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export function isMinted(tokenId: string) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const interval = setInterval(async () => {
      const token = await NFTService.findById(tokenId);
      if (token) {
        clearInterval(interval);
        resolve(true);
      }
      if (count > 150) {
        clearInterval(interval);
        reject(new Error('token not exist'));
      }
      count++;
    }, 1000);
  });
}

export function getImageType(imageType: string) {
  if (imageType === 'image') {
    return 'IMG';
  } else if (imageType === 'video') {
    return 'VID';
  }
  return 'AUD';
}

export function isLast(total: number, skip: number, size: number) {
  if (total <= skip + size) {
    return true;
  }
  return false;
}
