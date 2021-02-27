import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('surveys')
class Survey {
  /* define que ID é uma chave primária */
  @PrimaryColumn()
  readonly id: string;

  @Column(/* se os nomes forem diferentes colocar nome da coluna aqui | neste caso title === 'title' então não é necessário */)
  title: string;

  @Column(/* se os nomes forem diferentes colocar nome da coluna aqui | neste caso description === 'description' então não é necessário */)
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Survey };
