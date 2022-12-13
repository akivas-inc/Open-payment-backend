import { Global, Module } from "@nestjs/common";
import { GeneralHelper } from "./general-helper.service";

@Global()
@Module({
    providers: [GeneralHelper],
    exports: [GeneralHelper]
})
export class HelperModule {}