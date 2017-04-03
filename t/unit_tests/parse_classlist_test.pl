use strict;
use warnings;
use Test::Simple tests=>5;

# Relative path must be relative to the directory testAll.pl is run from.
use lib "../lib/WeBWorK/File";
use Classlist qw(:DEFAULT);

# Relative path must be relative to the directory testAll.pl is run from.
my @records = WeBWorK::File::Classlist::parse_classlist("./unit_tests/readURClassList_out.txt");

ok(scalar(@records) == 4, 'The number of records is correct.');

# Expecting each record to be a reference to a hash.
for my $hash_ref (@records) {
    foreach my $key (keys(%{$hash_ref})) {
	print $key, " : ", ${$hash_ref}{$key}, "\n";
    }
    my $email = ${$hash_ref}{'email_address'};
    my $multipass = ${$hash_ref}{'student_id'};
    
    ok($email eq $multipass.'@duq.edu', "Email address for $multipass is correct.");
}
