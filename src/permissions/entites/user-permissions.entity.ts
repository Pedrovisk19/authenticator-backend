import { UUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('user_permissions')
export class UserPermissions {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    allowEdit: boolean

    @Column()
    allowView: boolean

    @Column()
    userId: number
}