import { isObject } from './is';

/**
 * 拼接classname，用法与 classnames 库一致， 更推荐使用 classnames 库
 *
 *  classNames('foo', 'bar'); // => 'foo bar'
 *
    classNames('foo', { bar: true }); // => 'foo bar'

    classNames({ 'foo-bar': true }); // => 'foo-bar'

    classNames({ 'foo-bar': false }); // => ''

    classNames({ foo: true }, { bar: true }); // => 'foo bar'

    classNames({ foo: true, bar: true }); // => 'foo bar'
 *
 * @param  {...any} args
 */
export function classNames(...args: any[]) {
  const classnames = args.filter(name => !!name);
  return classnames
    .map(name => {
      if(isObject(name)) {
        const temps: string[] = [];
        Object.keys(name).forEach(v => {
          if(name[v]) {
            temps.push(v);
          }
        });
        name = temps.join(' ');
      }
      return name;
    })
    .join(' ');
}
