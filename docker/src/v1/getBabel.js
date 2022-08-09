export default function getBabel() {
  return process.env.BABEL || '/usr/bin/obabel';
  return '/opt/local/bin/obabel';
  return '/usr/bin/obabel';
}
