import type { OpenAPIHono } from '@hono/zod-openapi';
import { PrismaClient } from '@prisma/client';

import {
  CreateAnnouncementController,
  DeleteAnnouncementController,
  GetAnnouncementController,
  UpdateAnnouncementController,
} from './api';
import { ListAnnouncementController } from './api/controllers/ListAnnouncementController';
import { CreateAnnouncementSection } from './application/use-cases/CreateAnnouncementSection';
import { DeleteAnnouncementSection } from './application/use-cases/DeleteAnnouncementSection';
import { GetAnnouncementSection } from './application/use-cases/GetAnnouncementSection';
import { ListAnnouncementSections } from './application/use-cases/ListAnnouncementSections';
import { UpdateAnnouncementSection } from './application/use-cases/UpdateAnnouncementSection';
import { PrismaAnnouncementSectionRepository } from './infrastructure/repositories/PrismaAnnouncementSectionRepository';

export class AnnouncementModule {
  private createAnnouncementController: CreateAnnouncementController;
  private updatedAnnouncementController: UpdateAnnouncementController;
  private deleteAnnouncementController: DeleteAnnouncementController;
  private getAnnouncementController: GetAnnouncementController;
  private listAnnouncementController: ListAnnouncementController;

  constructor() {
    const announcementRepo = new PrismaAnnouncementSectionRepository(new PrismaClient());

    const createAnnouncement = new CreateAnnouncementSection(announcementRepo);
    this.createAnnouncementController = new CreateAnnouncementController(createAnnouncement);

    const updatedAnnouncement = new UpdateAnnouncementSection(announcementRepo);
    this.updatedAnnouncementController = new UpdateAnnouncementController(updatedAnnouncement);

    const deleteAnnouncement = new DeleteAnnouncementSection(announcementRepo);
    this.deleteAnnouncementController = new DeleteAnnouncementController(deleteAnnouncement);

    const getAnnouncement = new GetAnnouncementSection(announcementRepo);
    this.getAnnouncementController = new GetAnnouncementController(getAnnouncement);

    const listAnnouncement = new ListAnnouncementSections(announcementRepo);
    this.listAnnouncementController = new ListAnnouncementController(listAnnouncement);
  }

  route(app: OpenAPIHono) {
    app.route('/', this.createAnnouncementController.create());
    app.route('/', this.updatedAnnouncementController.update());
    app.route('/', this.deleteAnnouncementController.delete());
    app.route('/', this.getAnnouncementController.get());
    app.route('/', this.listAnnouncementController.list());
  }
}
