/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-18 17:33:35
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-19 09:21:34
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
