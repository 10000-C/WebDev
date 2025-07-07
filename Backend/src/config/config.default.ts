import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1751860627274_5478',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: 'database.sqlite', // SQLite 数据库文件路径
        synchronize: true,           // 自动同步实体（生产环境关闭）
        logging: true,               // 开启日志
        entities: [
          '**/entity/*.entity{.ts,.js}' // 实体文件路径
        ],
      }
    }
  },
} as MidwayConfig;
