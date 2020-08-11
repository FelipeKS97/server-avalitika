"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Formulary = use("App/Models/Formulary");
const Answer = use("App/Models/Answer");
const AnswerTransformer = "App/Transformers/Coordination/AnswerTransformer";

/**
 * Resourceful controller for interacting with dashboard
 */
class DashboardController {
  /**
   * Dashboard method to show a summary of all period answers, separated by month.
   * GET /coord/dashboard
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async answersSummary({ request, response, transform }) {
    const { period_id, course_id, answersNumber } = request.all();
    const numberOfAnswers = answersNumber || 5;

    const query = Answer.query().orderBy("created_at", "desc");

    if (period_id) {
      query.where("period_id", period_id);
    }

    let periodAnswers = await query.fetch();
    let monthsData = [
      { time: "Jan", amount: 0, id: 0 },
      { time: "Fev", amount: 0, id: 1 },
      { time: "Mar", amount: 0, id: 2 },
      { time: "Abr", amount: 0, id: 3 },
      { time: "Mai", amount: 0, id: 4 },
      { time: "Jun", amount: 0, id: 5 },
      { time: "Jul", amount: 0, id: 6 },
      { time: "Ago", amount: 0, id: 7 },
      { time: "Set", amount: 0, id: 8 },
      { time: "Out", amount: 0, id: 9 },
      { time: "Nov", amount: 0, id: 10 },
      { time: "Dez", amount: 0, id: 11 },
    ];

    let transformedAnswers = await transform
      .include("formulary")
      .collection(periodAnswers, AnswerTransformer);
    let courseAnswers = transformedAnswers.filter(
      (answer) =>
        answer.class.discipline.curriculum.course_id === parseInt(course_id)
    );
    let summaryData = [];
    let actualDate = new Date();

    courseAnswers.map((answer) => {
      let answerDate = new Date(answer.created_at);
      if (answerDate.getMonth()) {
        monthsData.map(
          (month) => month.id === answerDate.getMonth() && month.amount++
        );
      }
    });

    const filteredMonths = monthsData.filter(
      (m) => m.id < actualDate.getMonth() + 1
    );
    let cont = 0;
    courseAnswers.map((answer) => {
      if (cont < numberOfAnswers) {
        cont++;
        summaryData.push(answer);
      }
    });

    return response.send({
      months: filteredMonths,
      data: summaryData,
    });
  }
}

module.exports = DashboardController;
