import { integer } from 'aws-sdk/clients/cloudfront';
import { int } from 'aws-sdk/clients/datapipeline';
import { url } from 'inspector';
import { UUIDV4 } from 'sequelize';
import { BelongsToMany, Model } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';

@Table
export class Videos extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  gradeGroup: string;

  @Column
  grade: int;

  @Column
  subject: string;

  @Column
  videoNum: int;

  @Column
  videoTitle: string;

  @Column
  videoViews: string;
}
