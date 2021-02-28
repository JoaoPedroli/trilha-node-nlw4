import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    /* Validation Config */
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    // if( !(await schema.isValid(req.body)) ) {
    //   return res.status(400).json({ error: 'Validation Failed' });
    // }

    /* Validation */
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch(error) {
      return res.status(400).json({ error });
    }
    
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
      throw new AppError('User Already exists!');
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
