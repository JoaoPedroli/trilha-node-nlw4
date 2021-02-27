import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

// models
import { User } from './User';
import { Survey } from './Survey';

@Entity('surveys_users')
class SurveyUser {
  /* define que ID é uma chave primária */
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({name: 'survey_id'})
  survey: Survey

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
