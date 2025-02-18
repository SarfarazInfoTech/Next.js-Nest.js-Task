import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
    getMenus(): Promise<({
        children: ({
            children: ({
                children: ({
                    children: ({
                        children: {
                            name: string;
                            parentId: string | null;
                            id: string;
                            depth: number;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];
                    } & {
                        name: string;
                        parentId: string | null;
                        id: string;
                        depth: number;
                        createdAt: Date;
                        updatedAt: Date;
                    })[];
                } & {
                    name: string;
                    parentId: string | null;
                    id: string;
                    depth: number;
                    createdAt: Date;
                    updatedAt: Date;
                })[];
            } & {
                name: string;
                parentId: string | null;
                id: string;
                depth: number;
                createdAt: Date;
                updatedAt: Date;
            })[];
        } & {
            name: string;
            parentId: string | null;
            id: string;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createMenu(dto: CreateMenuDto): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMenu(id: string, dto: UpdateMenuDto): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteMenu(id: string): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
