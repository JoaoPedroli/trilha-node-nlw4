import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  /* define que ID é uma chave primária */
  @PrimaryColumn()
  id: string;

  @Column(/* se os nomes forem diferentes colocar nome da coluna aqui | neste caso name === 'name' então não é necessário */)
  name: string;

  @Column(/* se os nomes forem diferentes colocar nome da coluna aqui | neste caso email === 'email' então não é necessário */)
  email: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
