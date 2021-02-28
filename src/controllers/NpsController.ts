import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository";

class NpsController {
  /**
   * 1 2 3 4 5 6 7 8 9 10
   * Detratores => 0 - 6
   * Passivos => 7 - 8
   * Promotores => 9 - 10
   * 
   * (Número de promotores - número de detratores) / (número de respondentes) * 100
   */

  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6,
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10,
    ).length;

    const passives = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8,
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = ( promoters - detractors ) / totalAnswers * 100;

    return res.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: `${calculate.toFixed(2)}%`,
    });
  }
}

export default new NpsController();
