import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    
    /* permite usar os métodos do getRepository() na entidade "users" */
    const usersRepository = getCustomRepository(UsersRepository);
    
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });
    /**
     * Pega todos os usuários que possuem o email mandado
     * Se nenhum usuário for retornado o usuário pode ser cadastrado com tal email
     * 
     * O que seria em SQL: ` SELECT * FROM USERS WHERE EMAIL = "EMAIL" `
     */
    
    if(userAlreadyExists) {
      return res.status(400).json({
        error: 'User already exists.',
      });
    }

    /* Cria usuário */
    const user = usersRepository.create({
      name, email,
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }
}

export default new UserController();
