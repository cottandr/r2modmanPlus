import GameDirectoryResolver from './GameDirectoryResolver';
import R2Error from 'src/model/errors/R2Error';
import fs from 'fs-extra';
import * as path from 'path';
import { spawnSync } from 'child_process';

export default class PreloaderFixer {

    public static fix(): R2Error | void {
        const dirResult = GameDirectoryResolver.getDirectory();
        if (dirResult instanceof R2Error) {
            return dirResult;
        }
        if (!fs.existsSync(path.join(dirResult, 'Risk of Rain 2.exe'))) {
            return new R2Error('Risk of Rain 2 directory is invalid', 'could not find "Risk of Rain 2.exe"', 
                'Set the Risk of Rain 2 directory in the settings section');
        }
        try {
            fs.removeSync(path.join(dirResult, 'Risk of Rain 2_Data', 'Managed'));
        } catch(e) {
            const err: Error = e;
            return new R2Error('Failed to remove Managed directory', err.message, 'Try launching r2modman as an administrator');
        }
        try {
            spawnSync(`powershell`, ['start', 'steam://validate/632360']);
        } catch(e) {
            const err: Error = e;
            return new R2Error('Failed to start steam://validate', err.message, null);
        }
    }
}