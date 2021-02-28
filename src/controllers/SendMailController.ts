import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import { AppError } from '../errors/AppError';
import SendMailService from '../services/SendMailService';

// repositories
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUsersRepository } from '../repositories/SurveyUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);
    
    const user = await usersRepository.findOne({ email });

    if(!user) {
      return res.status(400).json({
        error: 'User does not exists',
      });
    }

    const survey = await surveyRepository.findOne({ id: survey_id });
    if(!survey) {
      throw new AppError('Survey User does not exists!');
    }
       
    const surveyUserAlreadyExists = await surveyUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    });
    
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    }

    // __dirname = pega o caminho exato de onde está a nossa aplicação
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    if(surveyUserAlreadyExists) {
      // se o id existir o valor do variables.id é igual ao valor do id existente
      variables.id = surveyUserAlreadyExists.id;

      await SendMailService.execute(email, survey.title, variables, npsPath)
      return res.json(surveyUserAlreadyExists);
    }
    
    /* Salvar informações na tabela */
    const surveyUser = surveyUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveyUsersRepository.save(surveyUser);

    /* Enviar e-mail para o usuário */
    // se o id não existir o valor de variables.id é igual ao valor do id criado
    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.json(surveyUser);
  }
}

export default new SendMailController();
