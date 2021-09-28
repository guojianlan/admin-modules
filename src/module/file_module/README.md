## how use

```ts

import {
  ImageModule,
  FileBaseModule,
  FileFactor,
} from './module/file_module';
ImageModule.forRootAsync({
  imports: [TypeOrmModule.forFeature(FileBaseModule.entities)],
  controllers: [...FileBaseModule.controllers],
  providers: [...FileBaseModule.providers],
  inject: [ConfigService],
  destination: 'upload/',
  useFactory: async (configService: ConfigService) => {
    //可以修改自定义的上传方法，修改文件路径和文件名
    // FileStorageInstall.install.getFilename = (req, file, cb) => {
    //   cb(null, +new Date());
    // };
    // mkdirDestination(configService.get('dir'));
    // FileStorageInstall.install.getDestination = (req, file, cb) => {
    //   cb(null, configService.get('dir'));
    // };
    //这个属于上传到本地
    // return new FileFactor({
    //   domain: () => {
    //     return 'http://127.0.0.1:3001';
    //   },
    // });
    //这个属于上传到cos
    return new FileFactorCos({
      SecretKey: configService.get('COS_SECRETKEY'),
      SecretId: configService.get('COS_SECRETID'),
      bucket: configService.get('COS_BUCKET'),
      region: configService.get('COS_REGION'),
      Key: (path) => {
        console.log(path);
        return path;
      },
      domain: () => {
        return 'http://127.0.0.1:3001';
      },
    });
  },
}),
```
