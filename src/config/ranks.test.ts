import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SMP_RANKS,
  BOXPVP_RANKS,
  getRankById,
  getCumulativeRankData,
  buildTicketMessage,
  formatPrice,
  formatKitChipKa,
} from './ranks';
import { STAFF_MEMBERS } from './staff';
import { RULE_CATEGORIES } from './rules';
import { SITE_CONFIG } from './site';
import { getSkinSources } from '../lib/skin';

test('site config matches exact ADRENALINEE server details and default skinMode', () => {
  assert.equal(SITE_CONFIG.serverName, 'ADRENALINEE');
  assert.equal(SITE_CONFIG.ip, 'adrenalinee.run');
  assert.equal(SITE_CONFIG.discordUrl, 'https://dsc.gg/adrenalinee');
  assert.deepEqual(SITE_CONFIG.ping, { min: 60, max: 90 });
  assert.equal(SITE_CONFIG.currency, '₾');
  assert.equal(SITE_CONFIG.skinMode, 'online-first');
});

test('getSkinSources returns exact ordered texture URLs for online-first, file-first, and files-only', () => {
  const onlineFirst = getSkinSources('CHABSKEYYY', 'skins/chabskeyyy.png', 'online-first');
  assert.deepEqual(onlineFirst, [
    'https://mc-heads.net/skin/CHABSKEYYY',
    'https://minotar.net/skin/CHABSKEYYY',
    '/assets/skins/chabskeyyy.png',
    '/assets/skins/default.png',
  ]);

  const fileFirst = getSkinSources('CHABSKEYYY', 'skins/chabskeyyy.png', 'file-first');
  assert.deepEqual(fileFirst, [
    '/assets/skins/chabskeyyy.png',
    'https://mc-heads.net/skin/CHABSKEYYY',
    'https://minotar.net/skin/CHABSKEYYY',
    '/assets/skins/default.png',
  ]);

  const filesOnly = getSkinSources('CHABSKEYYY', 'skins/chabskeyyy.png', 'files-only');
  assert.deepEqual(filesOnly, [
    '/assets/skins/chabskeyyy.png',
    '/assets/skins/default.png',
  ]);
});

test('SMP ranks match exact prices, homes, kits, and cumulative commands', () => {
  assert.equal(SMP_RANKS.length, 5);
  const expected = [
    { id: 'vip', name: 'VIP', price: 6.99, homes: 2, kitsCount: 1 },
    { id: 'vip-plus', name: 'VIP+', price: 14.99, homes: 3, kitsCount: 2 },
    { id: 'mvp', name: 'MVP', price: 24.99, homes: 4, kitsCount: 3 },
    { id: 'mvp-plus', name: 'MVP+', price: 36.99, homes: 6, kitsCount: 4 },
    { id: 'sponsor', name: 'SPONSOR', price: 62.99, homes: 8, kitsCount: 5 },
  ];

  for (const exp of expected) {
    const rank = getRankById('smp', exp.id);
    assert.ok(rank, `Missing SMP rank ${exp.id}`);
    assert.equal(rank.name, exp.name);
    assert.equal(rank.price, exp.price);
    assert.equal(rank.homes, exp.homes);
    assert.equal(rank.kits.length, exp.kitsCount);
    assert.equal(rank.durationKa, '4 კვირა (1 თვე)');
  }

  const sponsorCumulative = getCumulativeRankData('smp', 'sponsor');
  assert.ok(sponsorCumulative);
  assert.equal(sponsorCumulative.inheritedRanks.length, 4);
  for (const cmd of ['/hat', '/craft', '/ec', '/anvil', '/fly', '/repair all', '/tpahere', '/socialspy']) {
    assert.ok(sponsorCumulative.allCommands.includes(cmd), `Sponsor missing command ${cmd}`);
  }
});

test('BoxPvp ranks match exact prices, gear keys, player vaults, and kit cooldowns', () => {
  assert.equal(BOXPVP_RANKS.length, 5);
  const expected = [
    { id: 'nile', name: 'NILE', price: 6.99, gearKeys: 2, vaults: 3, kitsCount: 1 },
    { id: 'obelisk', name: 'OBELISK', price: 14.99, gearKeys: 3, vaults: 4, kitsCount: 2 },
    { id: 'osiris', name: 'OSIRIS', price: 24.99, gearKeys: 5, vaults: 6, kitsCount: 3 },
    { id: 'anubis', name: 'ANUBIS', price: 36.99, gearKeys: 5, vaults: 8, kitsCount: 4 },
    { id: 'sponsor', name: 'SPONSOR', price: 62.99, gearKeys: 5, vaults: 8, kitsCount: 5 },
  ];

  for (const exp of expected) {
    const rank = getRankById('boxpvp', exp.id);
    assert.ok(rank, `Missing BoxPvp rank ${exp.id}`);
    assert.equal(rank.name, exp.name);
    assert.equal(rank.price, exp.price);
    assert.equal(rank.gearKeys, exp.gearKeys);
    assert.equal(rank.playerVaults, exp.vaults);
    assert.equal(rank.kits.length, exp.kitsCount);
  }

  const nile = getRankById('boxpvp', 'nile')!;
  assert.equal(formatKitChipKa(nile.kits[0]), 'NILE · Cooldown: 6 სთ');
});

test('Ticket message, staff skin/NameMC fields, and rules config match exact specifications', () => {
  assert.equal(formatPrice(24.99), '24.99₾');
  const msg = buildTicketMessage({
    mode: 'smp',
    rankName: 'MVP+',
    price: 36.99,
    nickname: 'GeoPlayer',
  });
  assert.equal(msg, 'გამარჯობა! მინდა შევიძინო SMP – MVP+ (36.99₾). ნიკი: GeoPlayer');

  assert.equal(STAFF_MEMBERS.length, 5);
  for (const member of STAFF_MEMBERS) {
    assert.ok(member.minecraftName.length > 0);
    assert.ok(member.discord.length > 0);
    assert.ok(member.namemcUrl?.startsWith('https://namemc.com/profile/'));
    assert.ok(member.skinFile?.startsWith('skins/'));
  }

  const totalRules = RULE_CATEGORIES.reduce((acc, cat) => acc + cat.rules.length, 0);
  assert.ok(totalRules >= 25 && totalRules <= 35, `Expected 25-35 rules, got ${totalRules}`);
});
