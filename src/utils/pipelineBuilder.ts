export class pipelineBuilder {
  private pipeline: any[];

  constructor() {
    this.pipeline = [];
  }

  addProject(projection: Record<string, any> | undefined): pipelineBuilder {
    if (projection === undefined) return this;
    this.pipeline.push({ $project: projection });
    return this;
  }
  addMatch(condition: Record<string, any> | undefined): pipelineBuilder {
    if (condition == undefined) return this;
    this.pipeline.push({ $match: condition });
    return this;
  }

  addLimit(limit: number | undefined): pipelineBuilder {
    if (limit == undefined) return this;
    this.pipeline.push({ $limit: limit });
    return this;
  }

  addSort(sort: Record<string, number>): pipelineBuilder {
    if (sort == undefined) return this;
    this.pipeline.push({ $sort: sort });
    return this;
  }

  addFields(fields: Record<string, any> | undefined): pipelineBuilder {
    if (fields == undefined) return this;
    this.pipeline.push({ $addFields: fields });
    return this;
  }

  addStage(stage: Record<string, any>): pipelineBuilder {
    if (stage == undefined) return this;
    this.pipeline.push(stage);
    return this;
  }

  build(): any[] {
    return this.pipeline;
  }
}
