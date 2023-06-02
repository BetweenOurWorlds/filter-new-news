import fs from 'fs-extra';
import {program} from 'commander';

program
  .requiredOption('-o, --old <file>')
  .requiredOption('-n, --new <file>');

program.parse();

const options = program.opts();

main({oldFile: options.old, newFile: options.new});

async function main(options) {
  const {oldFile, newFile} = options;
  const oldNews = await fs.readJson(oldFile);
  const newNews = await fs.readJson(newFile);
  const oldLinks = oldNews.map(a => a.link);

  const result = newNews.filter(item => !oldLinks.includes(item.link));
  console.log(result);
}
