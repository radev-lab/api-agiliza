import { CreateDateColumn, UpdateDateColumn } from '~/libs';

export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
