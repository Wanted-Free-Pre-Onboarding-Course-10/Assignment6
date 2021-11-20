import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaRepository } from './area/area.repository';
import polylabel from 'polylabel';
import { ForbiddenRepository } from './fine-rule/forbidden.repository';
import { ParkingzoneRepository } from './discount-rule/discount.repository';
import { DeerRepository } from './deer/deer.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
    @InjectRepository(ForbiddenRepository)
    private forbiddenRepository: ForbiddenRepository,
    @InjectRepository(ParkingzoneRepository)
    private parkingRepository: ParkingzoneRepository,
    @InjectRepository(DeerRepository)
    private deerRepository: DeerRepository,
  ) {}

  // 기본 데이터 생성메서드
  async createBasicDatas() {
    await this.createArea();

    await this.createForbiddenArea();

    await this.createParkingZone();

    await this.createDeer();
  }

  // 지역 생성
  private async createArea() {
    const 은평_multipoint = [
      [-90, 180],
      [0, 180],
      [0, 16.34],
      [-90, 24.41],
    ];

    const 은평_boundary = [
      [-90, 180],
      [0, 180],
      [0, 16.34],
      [-90, 24.41],
      [-90, 180],
    ];
    const 은평 = {
      areaBoundary: 은평_boundary,
      areaCoords: 은평_multipoint,
      areaCenter: polylabel([은평_boundary]),
      basicFee: 500,
      extraFee: 30,
    };

    const 노원_multipoint = [
      [0, 180],
      [90, 180],
      [90, 20.44],
      [0, 16.34],
    ];

    const 노원_boundary = [
      [0, 180],
      [90, 180],
      [90, 20.44],
      [0, 16.34],
      [0, 180],
    ];
    const 노원 = {
      areaBoundary: 노원_boundary,
      areaCoords: 노원_multipoint,
      areaCenter: polylabel([노원_boundary]),
      basicFee: 400,
      extraFee: 25,
    };

    const 도봉_multipoint = [
      [-90, 24.41],
      [0, 16.34],
      [-4.23, -180],
      [-90, -180],
    ];
    const 도봉_boundary = [
      [-90, 24.41],
      [0, 16.34],
      [-4.23, -180],
      [-90, -180],
      [-90, 24.41],
    ];

    const 도봉 = {
      areaBoundary: 도봉_boundary,
      areaCoords: 도봉_multipoint,
      areaCenter: polylabel([도봉_boundary]),
      basicFee: 420,
      extraFee: 15,
    };

    const 중랑_multipoint = [
      [0, 16.34],
      [90, 20.44],
      [90, -180],
      [-4.32, -180],
    ];

    const 중랑_boundary = [
      [0, 16.34],
      [90, 20.44],
      [90, -180],
      [-4.32, -180],
      [0, 16.34],
    ];

    const 중랑 = {
      areaBoundary: 중랑_boundary,
      areaCoords: 중랑_multipoint,
      areaCenter: polylabel([중랑_boundary]),
      basicFee: 550,
      extraFee: 33,
    };

    const datas = [];
    datas.push(은평);
    datas.push(노원);
    datas.push(도봉);
    datas.push(중랑);

    await this.areaRepository.createArea(datas);
  }
  //==금지 구역 생성 == //
  private async createForbiddenArea() {
    const 금지1 = [
      [-90, 116.16],
      [-61.66, 110.69],
      [-60.3, 79.24],
      [-90, 77.87],
    ];
    const 금지2 = [
      [65.51, 173.59],
      [90, 180],
      [90, 132.57],
      [69.61, 131.2],
    ];
    const 금지3 = [
      [-23.12, 18.41],
      [0, 16.34],
      [-0.56, -9.61],
      [-19.27, -19.22],
    ];

    const datas2 = [];
    datas2.push(금지1);
    datas2.push(금지2);
    datas2.push(금지3);

    await this.forbiddenRepository.createForbiddenArea(datas2);
  }

  //파킹존 생성
  private async createParkingZone() {
    const 파킹존1_center = [-43.89, 51.89];
    const 파킹존1_radius = 10.12;

    const 파킹존2_center = [28.59, 87.44];
    const 파킹존2_radius = 20.32;

    const 파킹존3_center = [-47.99, -110.83];
    const 파킹존3_radius = 15.32;

    const 파킹존4_center = [50.46, -114.94];
    const 파킹존4_radius = 13.52;

    const datas3 = [];
    datas3.push({
      center: 파킹존1_center,
      radius: 파킹존1_radius,
    });
    datas3.push({
      center: 파킹존2_center,
      radius: 파킹존2_radius,
    });
    datas3.push({
      center: 파킹존3_center,
      radius: 파킹존3_radius,
    });
    datas3.push({
      center: 파킹존4_center,
      radius: 파킹존4_radius,
    });

    await this.parkingRepository.createParkingZone(datas3);
  }
  //퀵보드 생성
  private async createDeer() {
    const deer1 = {
      deerName: '킥보드1',
      area: await this.areaRepository.findOne(1),
    };

    await this.deerRepository.createDeer(deer1);

    const deer2 = {
      deerName: '킥보드2',
      area: await this.areaRepository.findOne(2),
    };
    await this.deerRepository.createDeer(deer2);

    const deer3 = {
      deerName: '킥보드3',
      area: await this.areaRepository.findOne(3),
    };
    await this.deerRepository.createDeer(deer3);

    const deer4 = {
      deerName: '킥보드4',
      area: await this.areaRepository.findOne(4),
    };
    await this.deerRepository.createDeer(deer4);

    const deer5 = {
      deerName: '킥보드5',
      area: await this.areaRepository.findOne(1),
    };
    await this.deerRepository.createDeer(deer5);

    const deer6 = {
      deerName: '킥보드6',
      area: await this.areaRepository.findOne(2),
    };
    await this.deerRepository.createDeer(deer6);

    const deer7 = {
      deerName: '킥보드7',
      area: await this.areaRepository.findOne(3),
    };
    await this.deerRepository.createDeer(deer7);

    const deer8 = {
      deerName: '킥보드8',
      area: await this.areaRepository.findOne(4),
    };
    await this.deerRepository.createDeer(deer8);
  }
}
