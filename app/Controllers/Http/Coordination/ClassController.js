"use strict";

const Discipline = use("App/Models/Discipline");
const Curriculum = use("App/Models/Curriculum");
const Class = use("App/Models/Class");
const ClassTransformer = use("App/Transformers/Coordination/ClassTransformer");

const Database = use("Database");

class ClassController {
  /**
   * Create/save a new set of classes.
   * POST classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeClasses({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const { period_id, classes, disc_array } = request.all();

      let currentClassSet = classes
      let outdatedClassSet = await Database.from("classes")
      .whereIn("discipline_id", disc_array)
      .andWhere("period_id", period_id)
      // .andWhere("is_inactive", false)

      let insertData = []

      currentClassSet.map((c) => {
        let exists = outdatedClassSet.some(outdated => 
          outdated.discipline_id === c.discipline_id &&
          outdated.professor_id === c.professor_id &&
          outdated.period_id === period_id
        )

        if(!exists) {
          // Adiciona o novo registro no array de inserção de dados no banco
          let unifiedID = `${period_id}${c.discipline_id}${c.professor_id}`;
          insertData.push({ ...c, period_id, id: unifiedID });
        }
      });

      outdatedClassSet.map(async (o) => {
        let exists = currentClassSet.some(current => 
          current.discipline_id === o.discipline_id &&
          current.professor_id === o.professor_id &&
          period_id === o.period_id
        )

        if(exists && o.is_inactive) {
          // Altera no banco a flag 'is_inactive' para false
         const updated = await Database.from("classes")
          .where("period_id", period_id)
          .andWhere("discipline_id", o.discipline_id)
          .andWhere("professor_id", o.professor_id)
          .update("is_inactive", false)

          await trx.commit();
        } else if(!exists) {
          // Altera no banco a flag 'is_inactive' para true
          const updated = await Database.from("classes")
          .where("period_id", period_id)
          .andWhere("discipline_id", o.discipline_id)
          .andWhere("professor_id", o.professor_id)
          .update("is_inactive", true)

          await trx.commit();
        }
      });

      insertData.length > 0 ? await Class.createMany(insertData) : []
      return response.status(201).send();

    } catch (error) {
      await trx.rollback();
      return response.status(400).send({
        message: "Erro ao processar solicitação.",
      });
    }
  }
  

  /**
   * Show a list of all disciplines.
   * GET classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */
  async getClasses({ request, response, transform }) {
    const { disc_array, period_id } = request.all();
    const query = Class.query()
      .whereIn("discipline_id", disc_array)
      .andWhere("period_id", period_id)
      .andWhere("is_inactive", false);

    let classes = await query.fetch();
    //classes = await transform.collection(classes, ClassTransformer)

    return response.send(classes);
  }

  /**
   * Show a list of all disciplines.
   * GET disciplines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */
  async listDisciplines({ request, response, pagination }) {
    const cID = request.input("curriculum_id");
    const query = Discipline.query();

    query.where("curriculum_id", cID);

    let disciplines = await query.fetch(); //.paginate(page, limit)
    //disciplines = await transform.paginate(disciplines, Transformer)

    return response.send(disciplines);
  }

  /**
   * Show a list of all curriculum.
   * GET curricula
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {Object} ctx.pagination
   */

  async listCurricula({ request, response, pagination }) {
    const cID = request.input("course_id");
    const query = Curriculum.query();

    query.where("course_id", cID);

    let curricula = await query.fetch(); //.paginate(page, limit)
    //curricula = await transform.paginate(curricula, Transformer)

    return response.send(curricula);
  }

  async listProfessors({ request, response, pagination }) {
    // const { page, limit } = pagination
    let results;
    const fullname = request.input("fullname");
    if (fullname) {
      results = await Database.select("user_id", "name", "fullname", "email")
        .from("users")
        .where("fullname", "LIKE", `%${fullname}%`)
        .leftJoin("professors", "users.id", "professors.user_id");
    } else {
      results = await Database.select("user_id", "name", "fullname", "email")
        .from("users")
        .leftJoin("professors", "users.id", "professors.user_id");
    }
    return response.send(results);
  }
}

module.exports = ClassController;
