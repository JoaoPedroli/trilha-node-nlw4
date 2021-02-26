import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    
    /* permite usar os métodos do getRepository() na entidade "users" */
    const usersRepository = getCustomRepository(UserRepository);

    /**
     * Pega todos os usuários que possuem o email mandado
     * Se nenhum usuário for retornado o usuário pode ser cadastrado com tal email
     * 
     * O que seria em SQL: ` SELECT * FROM USERS WHERE EMAIL = "EMAIL" `
     */

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

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

    return res.json(user);
  }
}

export default new UserController();
